"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {  FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause, FaHandHoldingUsd } from "react-icons/fa";
import ImageNext from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Popover, PopoverButton, PopoverPanel, Dialog, DialogPanel, DialogTitle, Radio, RadioGroup, Disclosure, DisclosureButton, DisclosurePanel, Label, Field, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { LuPersonStanding, LuSettings, LuTimerReset, LuWallet } from "react-icons/lu";
import { FaRankingStar } from "react-icons/fa6";
import { useProgram } from "../hooks/useProgram";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FcShop } from "react-icons/fc";
import UnAuthScreen from "./UnAuthScreen";
import audio from "../config/audio";
import useMusic from "../hooks/useMusis";
import { useBlockImages } from "../hooks/useImageLoader";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase";


const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 24;
const gridWidth = 10;
const gridHeight = 20;
const gridWidthPrev = 6;
const gridHeightPrev = 5;

const initialPrevGrid = Array(gridHeightPrev).fill(null).map(() => Array(gridWidthPrev).fill(0));


const initialGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(0));


const createBoard = () => Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0));


const futuristicColors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f", "#fff"];
const tetrominos = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];



const colors = [
  '#000000', // empty
  '#00f0f0', // I
  '#f0f000', // O
  '#a000f0', // T
  '#f0a000', // L
  '#0000f0', // J
  '#00f000', // S
  '#f00000', // Z
];

const blockType = [
  {
    name: "blockWood",
    price: 1000,
    point: 1.2,
    label: "Wood Block (Lv 1)"
  },
  {
    name: "blockZigzag",
    price: 4000,
    point: 1.7,
    label: "Zap Block (Lv 2)"
  },
  {
    name: "blockGlow",
    price: 10000,
    point: 2,
    label: "Glow Block (Lv 3)"
  },
  {
    name: "blockMetal",
    price: 20000,
    point: 2.5,
    label: "Block Metal (Lv 4)"
  },
  {
    name: "glow_block",
    price: 50000,
    point: 5,
    label: "Neon Block (Lv 5)"
  },


]

const rotateMatrix = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
const randomTetromino = () => {
  const index = Math.floor(Math.random() * tetrominos.length);
  return { shape: tetrominos[index], color: futuristicColors[index], row: 0, col: 3 };
};

const canMove = (grid, tetromino, offsetRow = 0, offsetCol = 0, shape = null) => {
  const shapeToCheck = shape || tetromino.shape;
  return shapeToCheck.every((row, rIdx) =>
    row.every((val, cIdx) => {
      if (!val) return true;
      const newRow = tetromino.row + rIdx + offsetRow;
      const newCol = tetromino.col + cIdx + offsetCol;
      return (
        newRow >= 0 &&
        newRow < gridHeight &&
        newCol >= 0 &&
        newCol < gridWidth &&
        grid[newRow][newCol] === 0
      );
    })
  );
};

const collides = (grid, tetromino, rowOffset = 0, colOffset = 0) => {
  const { shape, row: tRow, col: tCol } = tetromino;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue; // Skip empty cells

      const y = tRow + r + rowOffset;
      const x = tCol + c + colOffset;

      // Outside vertical bounds (bottom of grid)
      if (y >= grid.length) return true;

      // Outside horizontal bounds
      if (x < 0 || x >= grid[0].length) return true;

      // Colliding with a filled cell (only check if inside vertical bounds)
      if (y >= 0 && grid[y][x]) return true;
    }
  }

  return false; // No collision
};

const getShadowPosition = (grid, tetromino) => {
  const shadow = { ...tetromino, row: tetromino.row };

  while (!collides(grid, shadow, 1, 0)) {
    shadow.row += 1;
  }

  return shadow;
};

const mergeTetromino = (grid, tetromino, shadowTetromino = null) => {
  const newGrid = grid.map(row => [...row]);
  if (shadowTetromino) {
    shadowTetromino.shape.forEach((row, rIdx) => {
      row.forEach((val, cIdx) => {
        if (val) {
          const y = shadowTetromino.row + rIdx;
          const x = shadowTetromino.col + cIdx;
          if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth && newGrid[y][x] === 0) {
            // Use a negative or special value for shadow
            newGrid[y][x] = -1; // or a separate constant like SHADOW_CELL = -1;
          }
        }
      });
    });
  }


  tetromino.shape.forEach((row, rIdx) => {
    row.forEach((val, cIdx) => {
      if (val) {
        const y = tetromino.row + rIdx;
        const x = tetromino.col + cIdx;
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          const colorIndex = futuristicColors.indexOf(tetromino.color);
          if (colorIndex !== -1) {
            newGrid[y][x] = colorIndex + 1;
          }
        }
      }
    });
  });
  return newGrid;
};
const mergeTetrominoPrev = (grid, tetromino) => {
  const newGrid = grid.map(row => [...row]);
  tetromino.shape.forEach((row, rIdx) => {
    row.forEach((val, cIdx) => {
      if (val) {
        const y = tetromino.row + rIdx + 1;
        const x = tetromino.col + cIdx - 2;
        if (y >= 0 && y < gridHeightPrev && x >= 0 && x < gridWidthPrev) {
          const colorIndex = futuristicColors.indexOf(tetromino.color);
          if (colorIndex !== -1) {
            newGrid[y][x] = colorIndex + 1;
          }
        }
      }
    });
  });
  return newGrid;
};

const clearLines = (grid) => {
  let cleared = 0;
  const newGrid = grid.filter(row => {
    if (row.every(cell => cell !== 0)) {
      cleared++;
      return false;
    }
    return true;
  });

  const clearedRows = [];

  grid.forEach((row, y) => {
    if (row.every(cell => cell > 0)) {
      clearedRows.push(y);
    }
  });

  while (newGrid.length < gridHeight) {
    newGrid.unshift(Array(gridWidth).fill(0));
  }
  return { newGrid, cleared, clearedRows };
};


const missionType = {
  "Daily": "Score",
  "Weekly": "Cleared Lines"
}

const categories =
{
  "Daily": [
    {
      id: 1,
      title: 'Novice Block',
      desc: 'it`s okay, keep fighting to getting Rich',
      minScore: 3000,
      rewards: 300,
      notCleared: false,
      active: true,
      claimable: false,
      isClaimed: false
    },
    {
      id: 2,
      title: "Begginer Block",
      desc: 'still need to learn more, you are not rich yet',
      minScore: 6000,
      rewards: 1000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
    {
      id: 3,
      title: "Intermediate Block",
      desc: 'wow, you are growth! keep consistency',
      minScore: 13000,
      rewards: 2050,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
    {
      id: 4,
      title: "Advanced Block",
      desc: 'You are goat! do you think it`s enough ?',
      minScore: 30000,
      rewards: 4000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
    {
      id: 5,
      title: "Expert Block",
      desc: 'Monster!, still starving ?',
      minScore: 80000,
      rewards: 10000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
    {
      id: 6,
      title: "Master Block",
      desc: 'TetrisChain God',
      minScore: 150000,
      rewards: 15000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
  ],

  "Weekly": [
    {
      id: 1,
      title: 'Nerd Block Breaker',
      desc: 'You have a good time! Break More Block!',
      minScore: 5000,
      rewards: 50000,
      notCleared: false,
      active: true,
      claimable: false,
      isClaimed: false
    },
    {
      id: 2,
      title: "Psychopath Block Breaker",
      desc: 'are you okay? talk to me.',
      minScore: 10000,
      rewards: 100000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },
    {
      id: 3,
      title: "Jobless Block Breaker",
      desc: 'you better find a job...',
      minScore: 15000,
      rewards: 150000,
      notCleared: true,
      active: false,
      claimable: false,
      isClaimed: false
    },

  ],
}

const FuturisticTetris = () => {

  const tetrisRef = useRef();
  const previewRef = useRef()
  const previewDesktop = useRef()

  const containerRef = useRef()
  const scale = Math.min(
    containerRef.innerWidth / ((COLS) * (BLOCK_SIZE - 12)),
    containerRef.innerHeight / (ROWS * BLOCK_SIZE - 12)
  );
  const [grid, setGrid] = useState(initialGrid);
  const [gridPrev, setGridPrev] = useState(initialPrevGrid);
  const [score, setScore] = useState(() => 0);
  const [clearedLines, setClearedLines] = useState(() => 0);
  const [myBalance, setBalance] = useState(0);
  const [current, setCurrent] = useState(randomTetromino());
  const [nextTetro, setNextTetro] = useState(randomTetromino());
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => JSON.parse(localStorage.getItem("leaderboard")) || []);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const [isPlay, setPlay] = useState(true);
  const [isPause, setPause] = useState(false);
  const [isSetting, setSetting] = useState(false);
  const [gameOverAlert, setGameOverAlert] = useState(false);
  const [currBlockType, setCurrBlockType] = useState(blockType[0]);
  const [isMission, setMission] = useState(false)
  const [accountInfo, setAccountInfo] = useState({
    address: "",
    solBalance: ""
  })

  const [listMissions, setListMission] = useState(() => categories)

  const [missionActive, setMissionActive] = useState("Daily")

  const [highScore, setHighScore] = useState(0);

  const [highlightRows, setHighlightRows] = useState([]);

  const [volume, setVolume] = useState({
    "Music (BGM)": JSON.parse(localStorage.getItem("Music (BGM)")) ? JSON.parse(localStorage.getItem("Music (BGM)")) : 1,
    "Block Effects": JSON.parse(localStorage.getItem("Block Effects")) ? JSON.parse(localStorage.getItem("Block Effects")) : 1,
    "Sound Effects": JSON.parse(localStorage.getItem("Sound Effects")) ? JSON.parse(localStorage.getItem("Sound Effects")) : 1,

  })

  const [gameState, setGameState] = useState("idle");
  const toAudio = src => {
    const temp = useRef(new Audio(src));

    return temp.current;
  }




  // audio
  const getRandClearSound = _ => {
    const getRand = () => {
      const num = Math.round(Math.random() * 5) + 1;
      const clearAudio = audio.blockClear(num);
      return clearAudio
    }

    return getRand();
  }


  const gamePlay = toAudio(audio.gamePlay);
  const gameOverSound = toAudio(audio.gameOver);
  const drop = toAudio(audio.blockDownFast);
  const clear = toAudio(getRandClearSound());
  const move = toAudio(audio.blockMoving);
  const rotate = toAudio(audio.blockRotate);

  const updateLeaderboard = (finalScore) => {
    const newEntry = { score: finalScore, date: new Date().toLocaleString() };
    const updated = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
    setLeaderboard(updated);
  };


  useEffect(() => {
    gamePlay.pause()
    gamePlay.volume = volume["Music (BGM)"];
    gamePlay.play()
    gameOverSound.volume = volume["Sound Effects"]
    drop.volume = volume["Block Effects"];
    clear.volume = volume["Block Effects"];
    move.volume = volume["Block Effects"];
    rotate.volume = volume["Block Effects"];


    localStorage.setItem("Music (BGM)", volume["Music (BGM)"])
    localStorage.setItem("Sound Effects", volume["Sound Effects"])
    localStorage.setItem("Block Effects", volume["Block Effects"])
  }, [volume])

  const restartGame = () => {
    localStorage.removeItem("score");
    setGrid(initialGrid);
    setCurrent(randomTetromino());
    setScore(0);
    setGameOver(false);
    setStarted(true);
    setGameState('idle');
    setPlay(false)
    setGameOverAlert(false)
    const newTetromino = randomTetromino();
    setNextTetro(newTetromino)
    setPause(false)
  }

  const { balance,
    publicKey,
    connected,
    connection, account } = useProgram();

  useEffect(() => {
    setCurrent(randomTetromino());

  }, [currBlockType])

  const images = useBlockImages();
  const shadow = getShadowPosition(grid, current);
  const displayGrid = mergeTetromino(grid, current, shadow);
  const previewGrid = mergeTetrominoPrev(gridPrev, nextTetro);

  const ctxRef = useRef();
  useEffect(() => {
    ctxRef.current = tetrisRef.current?.getContext('2d');
  }, [started]);

  const drawNext = () => {
    const ctxPrev = previewRef.current?.getContext('2d');
    const ctxPrevDesktop = previewDesktop.current?.getContext('2d');

    ctxPrev.clearRect(0, 0, gridWidthPrev * 15, gridHeightPrev * 15);
    ctxPrevDesktop.clearRect(0, 0, gridWidthPrev * 20, gridHeightPrev * 20);

    const drawPreview = (x, y, value) => {
      ctxPrev.fillStyle = value !== -1 ? colors[value] : "";


      if (value > 0) {
        const img = images[currBlockType.name];
        if (img) {
          ctxPrev.drawImage(img, x * 15, y * 15, 15, 15); // Draw image at x=50, y=50 with width and height of 100

          ctxPrev.globalAlpha = 0.4;
          ctxPrev.fillRect(x * 15, y * 15, 15, 15);
          ctxPrev.globalAlpha = 1.0;
        }
      } else {
        // ctxPrev.fillRect(x * 15, y * 15, 15, 15);
      }

      // ctxPrev.strokeRect(x * 15, y * 15, 15, 15);
    };
    const drawPreviewDesktop = (x, y, value) => {
      ctxPrevDesktop.fillStyle = value !== -1 ? colors[value] : "";


      if (value > 0) {
        const img = images[currBlockType.name];
        if (img) {
          ctxPrevDesktop.drawImage(img, x * 20, y * 20, 20, 20); // Draw image at x=50, y=50 with width and height of 100

          ctxPrevDesktop.globalAlpha = 0.4;
          ctxPrevDesktop.fillRect(x * 20, y * 20, 20, 20);
          ctxPrevDesktop.globalAlpha = 1.0;
        }
      } else {
        // ctxPrev.fillRect(x * 15, y * 15, 15, 15);
      }

      // ctxPrev.strokeRect(x * 15, y * 15, 15, 15);
    };

    previewGrid.forEach((row, y) => {
      row.forEach((cell, x) => drawPreview(x, y, cell));
    });
    previewGrid.forEach((row, y) => {
      row.forEach((cell, x) => drawPreviewDesktop(x, y, cell));
    });
  }

  const draw = () => {

    const ctx = ctxRef.current
    
    ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

    const drawCell = (x, y, value) => {
      ctx.fillStyle = value !== -1 ? colors[value] : "#111";
      const isHighlight = highlightRows.includes(y);

      if (isHighlight) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#bfd8f5'; // flash white
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = '#6387b0';
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        return;
      }
      if (value > 0) {
        const img = images[currBlockType.name];
        if (img) {
          ctx.drawImage(img, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // Draw image at x=50, y=50 with width and height of 100

          ctx.globalAlpha = 0.5;
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.globalAlpha = 1.0;
        }
      } else {
        ctx.fillStyle = value !== -1 ? "#52769e" : "#345a85";
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }

      ctx.strokeStyle = '#6387b0';
      ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    };

    

    displayGrid.forEach((row, y) => {
      row.forEach((cell, x) => drawCell(x, y, cell));
    });
    
    drawNext();
  };

  const finalizeClear = (newGrid, cleared) => {
    setScore(prev => {
      const updated = prev + (cleared * currBlockType.point) * 100;
      localStorage.setItem("score", updated);
      return updated;
    });

   
    gridRef.current = newGrid;
    pieceRef.current = nextRef.current;
    nextRef.current = randomTetromino();
    setGrid(newGrid);
    setCurrent(nextRef.current);
    setNextTetro(nextRef.current);
  };


  useEffect(() => {
    const airdropDevnetSol = async () => {
      if (!publicKey) return;



      try {
        const _balance = await connection.getBalance(publicKey);
        const solBalance = _balance / LAMPORTS_PER_SOL;
        const address = publicKey.toString()
        setAccountInfo(() => ({
          address: address.slice(0, 6) + (address.length > 6 ? "...." : "") + address.slice(address.length - 6, address.length),
          solBalance: solBalance
        }))

      } catch (error) {
        console.log(error);
      }
    };

    airdropDevnetSol();
  }, [publicKey]);

  const pieceRef = useRef(current);
  const gridRef = useRef(grid);
  const nextRef = useRef(nextTetro);
  const gameOverRef = useRef(gameOver);

  useEffect(() => {
    pieceRef.current = current;
    gridRef.current = grid;
    nextRef.current = nextTetro;
    gameOverRef.current = gameOver;
  }, [current, grid, nextTetro, gameOver]);

  const applyMovement = (dir) => {
    const [rowOffset, colOffset] = {
      left: [0, -1],
      right: [0, 1],
      down: [1, 0],
    }[dir];

    if (canMove(grid, current, rowOffset, colOffset)) {
      setCurrent(prev => ({
        ...prev,
        row: prev.row + rowOffset,
        col: prev.col + colOffset,
      }));
      move.play();
    }
  };

  const applyRotation = () => {
    const rotated = rotateMatrix(current.shape);
    if (canMove(grid, current, 0, 0, rotated)) {
      setCurrent(prev => ({ ...prev, shape: rotated }));
      rotate.play();
    }
  };

  const applyHardDrop = () => {
    let dropRow = 0;
    while (canMove(grid, current, dropRow + 1, 0)) {
      dropRow++;
    }
    const dropped = { ...current, row: current.row + dropRow };
    const merged = mergeTetromino(grid, dropped);
    const { newGrid, cleared, clearedRows } = clearLines(merged);
    const next = randomTetromino();

    drop.play();

    if (!canMove(newGrid, next)) {
      setGameOver(true);
      setGameState("GameOver");
      updateLeaderboard(score);
      setGameOverAlert(true);
    } else {
      if (cleared > 0) clear.play();
      if (clearedRows.length > 0) {

        finalizeClear(newGrid, cleared);
      } else {

        finalizeClear(newGrid, cleared);
      }

      
      // setScore(prev => {
      //   const updated = prev + (cleared * currBlockType.point) * 100;
      //   localStorage.setItem("score", updated);
      //   return updated;
      // });

      // setGrid(newGrid);
      // setCurrent(next);
      // setNextTetro(next);
    }
  };


  const handleKeyDown = (e) => {
    if (gameOver || !started || isPause) return;

    switch (e.key) {
      case "ArrowLeft":
        applyMovement("left");
        break;
      case "ArrowRight":
        applyMovement("right");
        break;
      case "ArrowDown":
        applyMovement("down");
        break;
      case "ArrowUp":
        applyRotation();
        break;
      case " ":
        applyHardDrop();
        break;
      default:
        break;
    }
  };

  // const handleKeyDown = (e) => {
  //   if (gameOver || !started || isPause) return;
  //   if (["ArrowLeft", "ArrowRight", "ArrowDown"].includes(e.key)) {
  //     move.play();
  //   }
  //   if (e.key === "ArrowLeft" && canMove(grid, current, 0, -1)) {
  //     setCurrent(prev => ({ ...prev, col: prev.col - 1 }));
  //   } else if (e.key === "ArrowRight" && canMove(grid, current, 0, 1)) {
  //     setCurrent(prev => ({ ...prev, col: prev.col + 1 }));
  //   } else if (e.key === "ArrowDown" && canMove(grid, current, 1, 0)) {
  //     setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
  //   } else if (e.key === "ArrowUp") {
  //     const rotated = rotateMatrix(current.shape);
  //     rotate.play();
  //     if (canMove(grid, current, 0, 0, rotated)) {
  //       setCurrent(prev => ({ ...prev, shape: rotated }));
  //     }
  //   } else if (e.key === " ") {
  //     let dropRow = 0;
  //     drop.play()
  //     while (canMove(grid, current, dropRow + 1, 0)) {
  //       dropRow++;
  //     }
  //     setCurrent(prev => {
  //       const newTetromino = { ...prev, row: prev.row + dropRow };
  //       const merged = mergeTetromino(grid, newTetromino);
  //       const { newGrid, cleared } = clearLines(merged);
  //       const next = randomTetromino();

  //       if (!canMove(newGrid, next)) {
  //         setGameOver(true);
  //         setGameState('GameOver');
  //         updateLeaderboard(score);
  //         setGameOverAlert(true);
  //       } else {

  //         setScore(prevScore => {
  //           const updated = prevScore + (cleared * currBlockType.point) * 100;
  //           if (updated > prevScore) {
  //             clear.play();
  //           }
  //           localStorage.setItem("score", updated);

  //           return updated;
  //         });
  //         setGrid(newGrid);
  //         setCurrent(next);

  //       }
  //       return newTetromino;
  //     });
  //   }
  // };

  const handleButtonClick = (dir) => {
    if (gameOver || !started || isPause) return;

    if (["left", "right", "down"].includes(dir)) {
      applyMovement(dir);
    } else if (dir === "rotate") {
      applyRotation();
    } else if (dir === "drop") {
      applyHardDrop();
    }
  };


  // const handleButtonClick = (direction) => {
  //   if (gameOver || !started || isPause) return;
  //   if (["left", "right", "down"].includes(direction)) {
  //     move.play();
  //   }
  //   if (direction === "left" && canMove(grid, current, 0, -1)) {
  //     setCurrent(prev => ({ ...prev, col: prev.col - 1 }));
  //   } else if (direction === "right" && canMove(grid, current, 0, 1)) {
  //     setCurrent(prev => ({ ...prev, col: prev.col + 1 }));
  //   } else if (direction === "down" && canMove(grid, current, 1, 0)) {
  //     setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
  //   } else if (direction === "rotate") {
  //     const rotated = rotateMatrix(current.shape);
  //     rotate.play();
  //     if (canMove(grid, current, 0, 0, rotated)) {
  //       setCurrent(prev => ({ ...prev, shape: rotated }));
  //     }
  //   } else if (direction === "drop") {
  //     let dropRow = 0;
  //     drop.play();

  //     while (canMove(grid, current, dropRow + 1, 0)) {
  //       dropRow++;
  //     }
  //     setCurrent(prev => {
  //       const newTetromino = { ...prev, row: prev.row + dropRow };
  //       const merged = mergeTetromino(grid, newTetromino);
  //       const { newGrid, cleared } = clearLines(merged);
  //       const next = randomTetromino();

  //       if (!canMove(newGrid, next)) {
  //         setGameOver(true);
  //         setGameState('GameOver');
  //         updateLeaderboard(score);
  //         setGameOverAlert(true);
  //       } else {

  //         setScore(prevScore => {
  //           const updated = prevScore + (cleared * currBlockType.point) * 100;
  //           if (updated > prevScore) {
  //             clear.play();
  //           }
  //           localStorage.setItem("score", updated);

  //           return updated;
  //         });
  //         setGrid(newGrid);
  //         setCurrent(next);

  //       }
  //       return newTetromino;
  //     });
  //   }
  // };


  useEffect(() => {
    const handleUserInteraction = () => {
      switch (gameState) {
        case 'idle': {
          gamePlay.pause();
          gamePlay.loop = true;
          gamePlay.volume = volume["Music (BGM)"];
          gamePlay.play().catch(err => console.error(err));
          break;
        }
        case 'GameOver': {
          gamePlay.pause();

          gameOverSound.volume = volume["Sound Effects"];
          gameOverSound.play()

          break;
        }

      }

      // Remove the listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [gameState, volume])


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, current, gameOver, started]);



  useEffect(() => {
    if (!started || gameOver || isPause) return;

    let lastTime = performance.now();
    let dropCounter = 0;
    const dropInterval = 800; // ms

    const update = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      dropCounter += deltaTime;

      if (dropCounter > dropInterval) {
        dropCounter = 0;

      }

      draw(); // Use refs internally to draw
      requestAnimationFrame(update);
    };

    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [grid, current, gameOver, started, isPause]);





  useEffect(() => {
    if (!started || gameOver || isPause) return;

    const gameLoop = _ => {
      const grid = gridRef.current;
      const current = pieceRef.current;

      if (canMove(grid, current, 1, 0)) {
        pieceRef.current = { ...current, };
        setCurrent(prev => ({
          ...prev,
          row: current.row + 1
        }));
      } else {
        const merged = mergeTetromino(grid, current);
        const { newGrid, cleared, clearedRows } = clearLines(merged);

        if (!canMove(newGrid, nextRef.current)) {
          setGameOver(true);
          setGameState('GameOver');
          updateLeaderboard(score);
          setGameOverAlert(true);
          return; // Stop game loop
        }

        if (cleared > 0) clear.play();
        if (clearedRows.length > 0) {
          finalizeClear(newGrid, cleared);
        } else {
          finalizeClear(newGrid, cleared);
        }

      };
    }

    intervalRef.current = setInterval(gameLoop, 800);

    return () => clearInterval(intervalRef.current);
  }, [grid, current, gameOver, started, isPause]);

  // useEffect(() => {
  //   if (!started || gameOver || isPause) return;
  //   const gameLoop = () => {
  //     if (canMove(grid, current, 1, 0)) {
  //       setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
  //     } else {
  //       const merged = mergeTetromino(grid, current);
  //       const { newGrid, cleared } = clearLines(merged);


  //       if (!canMove(newGrid, nextTetro)) {
  //         setGameOver(true);
  //         setGameState('GameOver');
  //         clearInterval(intervalRef.current);
  //         updateLeaderboard(score);
  //         setGameOverAlert(true);

  //       } else {

  //         setScore(prev => {
  //           const updated = prev + (cleared * currBlockType.point) * 100;
  //           if (updated > prev) {
  //             clear.play();
  //           }
  //           localStorage.setItem("score", updated);
  //           return updated;
  //         });
  //         setGrid(newGrid);
  //         setCurrent(nextTetro);
  //         const newTetromino = randomTetromino();
  //         setNextTetro(newTetromino)
  //       }
  //     }
  //   };
  //   // intervalRef.current = setInterval(gameLoop, 800);
  //   let lastTime = performance.now();
  //   const dropInterval = 800; // ms
  //   let dropCounter = 0;

  //   const update = (time) => {
  //     const deltaTime = time - lastTime;
  //     lastTime = time;
  //     dropCounter += deltaTime;

  //     if (dropCounter > dropInterval) {
  //       dropCounter = 0;
  //       gameLoop()
  //     }
  //     draw();
  //     requestAnimationFrame(update);
  //   };

  //   requestAnimationFrame(update);


  //   return () => {
  //     cancelAnimationFrame(update)
  //   };
  // }, [started, isPause]);


  const claimReward = (minScore, id, mstype) => {

    if (score < minScore) return false;

    const tempMission = listMissions[mstype][id - 1];

    let nextMission = false
    if (id < listMissions[mstype].length) {

      nextMission = listMissions[mstype][id];
    }

    setListMission((prev) => {
      let currMission = [
        ...prev[mstype].filter((e) => ![id, id + 1].includes(e.id)),
        {
          ...tempMission,
          notCleared: false,
          active: false,
          claimable: false,
          isClaimed: true
        }
      ]

      if (id < listMissions[mstype].length) {
        currMission = [...currMission, {
          ...nextMission,
          notCleared: false,
          active: true,
          claimable: false,
          isClaimed: false
        }]
      }
      const lude = {
        ...prev, [mstype]: currMission.sort((a, b) => a.id > b.id ? 1 : -1)
      }


      return lude
    })

    setBalance((prev) => prev + tempMission.rewards)

  }

  const [loading, setLoading] = useState(false)
  const [isConnect, setIsConnect] = useState(false)

  useEffect(()=> {
    setLoading(true)
    const getData = async () => {
    const data = await supabase.auth.getUserIdentities();
    
    setLoading(false)
      console.log(data);
      if(!data.error){
      setIsConnect(true)
    }
    }
    
    getData()
  }, [])

    



  if (true) {
    return (
      <UnAuthScreen />
    );
  }

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
      <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-50 w-full">
        <div className="flex items-center gap-1">
          <ImageNext src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
        </div>
        
          

        <Popover className=" z-100">
          <div className="flex flex-row">

            <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold me-2 ">
              <span>Menu</span>
              <ChevronDownIcon aria-hidden="true" className="size-5" />
            </PopoverButton>
            <Button className="bg-green-600 hover:bg-cyan-800 text-white rounded-xl flex flex-row justify-center align-center me-2" onClick={() => setPlay(true)}>
              {started ? <LuTimerReset size={18} /> : <FaPlayCircle size={18} />}
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-800 text-white rounded-xl flex flex-row justify-center align-center me-2" onClick={() => setPause(!isPause)}>
              {isPause ? <FaPlayCircle size={18} /> : <FaPause size={18} />}
            </Button>
            <a  href={"/leaderboard"}  className=" px-4 py-2 font-semibol bg-blue-600 hover:bg-blue-800 text-white rounded-xl flex flex-row justify-center align-center me-2" >
              <FaRankingStar size={18} />
            </a>
            <a  href={"/market"}  className=" px-4 py-2 font-semibol bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl flex flex-row justify-center align-center" >
              <FcShop   size={18} />
            </a>
          </div>
          <PopoverPanel
            transition
            className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
          >
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <FaAddressCard aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg">
                      Wallet
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">Address : {accountInfo.address}</p>
                    <p className="mt-1 text-gray-600">Sol Balance : {accountInfo.solBalance}</p>
                    <WalletMultiButton />
                  </div>
                </div>
                {/* <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <FaTasks aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" onClick={() => setMission(true)}>
                      Daily Mission
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">Complete Daily Mission to get rewards</p>
                  </div>
                </div> */}
                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <FaWallet aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" onClick={() => setIsOpen(true)}>
                      Balance
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600 font-semibold">$TRSCHN Balance : {myBalance}</p>
                  </div>
                </div>
                {/* <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <ShoppingCartIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" onClick={() => setSetting(true)}>
                      Market
                    </a>
                    <p className="mt-1 text-gray-600 font-semibold">Place where you can buy Non - NFT & NFT Collection Blocks</p>
                  </div>
                </div> */}
                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center" onClick={() => setSetting(true)}>
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <LuSettings aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" >
                      Profile
                    </a>
                    <p className="mt-1 text-gray-600 font-semibold">Edit your profile for identiry </p>
                  </div>
                </div>

              </div>
            </div>
          </PopoverPanel>
        </Popover>

      </div>
      <Dialog open={isPlay} as="div" className="relative z-10 focus:outline-none" onClose={() => setPlay(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Ready To Play Tetris Chain ?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                You are now on Tetris Chain Game, let's Play and Earn!
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                  onClick={restartGame}
                >
                  Play Now !
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => setPlay(false)}
                >
                  Later
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog open={isMission} as="div" className="relative z-10 focus:outline-none" style={{ zIndex: 999 }} onClose={() => setMission(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black/70 p-6 backdrop-blur-2xl duration-300 ease-out"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white mb-3">
                Clear All Mission and Gain Rewards !
              </DialogTitle>
              <TabGroup >
                <TabList className="flex gap-4">
                  {Object.keys(listMissions).map((mstype) => (
                    <Tab
                      key={mstype}
                      className={`rounded-full px-4 py-2 text-sm/6 font-semibold text-white shadow   ${missionActive === mstype ? "bg-white/10" : "bg-white/5"}`}
                    >
                      {mstype}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="mt-3">
                  {Object.keys(listMissions).map((mstype) =>
                    <TabPanel key={mstype} className={`rounded-xl  p-3`} as="div" onClick={e => false} >
                      {
                        listMissions[mstype].map((ms) => (
                          <div key={ms.id} className={`relative rounded-md p-3 text-sm/6 transition my-2   ${ms.notCleared && "bg-gray-500/25"} ${ms.active && "bg-gray-200/25  outline outline-2 outline-white/30"}`}>
                            <div className="flex flex-row justify-between w-min-full items-center">
                              <div className="flex ">

                                <li className="flex  flex-col ">
                                  <span className="font-semibold text-white">
                                    {(ms.notCleared || ms.isClaimed) && <span className="absolute inset-0 bg-gray-900/75 rounded-md" />}
                                    {ms.title}
                                  </span>
                                  <ul aria-hidden="true">
                                    <li className=" text-white/50 text-xs mb-3 w-50 text-wrap">{ms.desc} </li>
                                    <li className=" text-white/75">{(mstype === "Daily" ? score : clearedLines) > ms.minScore ? ms.minScore : (mstype === "Daily" ? score : clearedLines)}/{ms.minScore} {missionType[mstype]}</li>
                                  </ul>
                                </li>
                              </div>
                              <Button disabled={ms.notCleared || ms.isClaimed} onClick={() => claimReward(ms?.minScore, ms.id, mstype)} className={`${ms.active ? "bg-green-500 w-20  hover:bg-green-800" : "bg-gray-700/50 w-20"} text-white rounded-xl flex  flex-col  justify-center items-center`} >
                                <ImageNext src="/images/icon.webp" alt="TetrisChain Logo" width={30} height={40} />
                                <span className="text-xs">
                                  {ms?.rewards} $TRSCHN
                                </span>
                              </Button>
                            </div>
                            {
                              ms.active && <CheckCircleIcon className="size-6 fill-white  transition " style={{ position: "absolute", top: -2, right: -2 }} />
                            }
                          </div>
                        ))
                      }
                    </TabPanel>
                  )}
                </TabPanels>
              </TabGroup>

              <div className="mt-4">

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => setMission(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog >
      <Dialog open={isSetting} as="div" className="relative z-1000 focus:outline-none" style={{ zIndex: 99999 }} onClose={() => setSetting(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center min-w-full p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Settings
              </DialogTitle>
              <hr></hr>
              <Disclosure as="div" className="p-6" >
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                    Choose Block Type (Non-NFT)
                  </span>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                  <RadioGroup name="name" value={currBlockType} onChange={(e) => setCurrBlockType(prev => e)} aria-label="Server size" className="space-y-2">
                    {blockType.map((block) => (
                      <Radio
                        key={block.name}
                        value={block}
                        className={`group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:not-data-focus:outline-none ${block.name === currBlockType.name && "bg-white/10"} ${block.name === currBlockType.name && "outline"} ${block.name === currBlockType && "outline-white"}`}
                      >
                        <div className="flex w-full items-center ">
                          <div className="text-sm/6">
                            <p className="font-semibold text-white">{block.label}</p>
                            <div className="flex gap-2 text-white/50 flex-row items-center justify-between">
                              <div>+{(block.point * 100) - 100}% Score </div>
                              <div aria-hidden="true">&middot;</div>
                              {/* <div>{block.price} $TRSCH</div> */}
                              {/* <div aria-hidden="true">&middot;</div> */}

                              <motion.div
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-md "
                                style={{ backgroundColor: "gray" }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <img src={`/images/${block.name}.webp`} className="w-10 h-10 sm:w-11 sm:h-11 rounded-md " style={{ opacity: 0.8 }} />
                              </motion.div>
                            </div>
                          </div>
                          {
                            block.name === currBlockType && <CheckCircleIcon className="size-6 fill-white  transition " style={{ position: "absolute", top: -2, right: -2 }} />
                          }

                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>

                </DisclosurePanel>
              </Disclosure>
              <hr color="gray.900" ></hr>
              <Disclosure as="div" className="p-6" >
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                    Choose Block NFT Collection
                  </span>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-white/50 text-center">
                  <h4>Coming Soon...</h4>
                  {/* <RadioGroup value={currBlockType} onChange={(e) => setCurrBlockType(e)} aria-label="Server size" className="space-y-2">
                    {[].map((block) => (
                      <Radio
                        key={block.name}
                        value={block.name}
                        className={`group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:not-data-focus:outline-none ${block.name === currBlockType && "bg-white/10"} ${block.name === currBlockType && "outline"} ${block.name === currBlockType && "outline-white"}`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="text-sm/6">
                            <p className="font-semibold text-white">{block.label}</p>
                            <div className="flex gap-2 text-white/50 flex-row items-center justify-between">
                              <div className="flex gap-2 text-white/50 flex-row items-center">
                                <div>+{block.point} Points</div>
                                <div aria-hidden="true">&middot;</div>
                                <div>{block.price} $TRSCH</div>
                                <div aria-hidden="true">&middot;</div>
                              </div>

                              <motion.div
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-md "
                                style={{ backgroundColor: "gray" }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <img src={`/images/${block.name}.webp`} className="w-10 h-10 sm:w-11 sm:h-11 rounded-md " style={{ opacity: 0.8 }} />
                              </motion.div>
                            </div>
                          </div>
                          {
                            block.name === currBlockType && <CheckCircleIcon className="size-6 fill-white  transition " />
                          }

                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>*/}

                </DisclosurePanel>
              </Disclosure>
              <hr></hr>
              <Disclosure as="div" className="p-6" >
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                    Volume
                  </span>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                  {Object.keys(volume).map((tempVol) => (
                    <div key={tempVol} >
                      <label htmlFor="small-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{tempVol}</label>
                      <input min={0} max={1} step={0.1} id="small-range" type="range" value={volume[tempVol]} onChange={e => setVolume((res) => ({ ...res, [tempVol]: e.target.value, }))} className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"></input>
                    </div>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              <hr></hr>
              <div className="mt-4">

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => setSetting(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog >
      <Dialog open={isPause} as="div" className="relative z-10 focus:outline-none" onClose={() => setPause(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Game Paused
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                The game will not continue until you close the prompt
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                  onClick={() => setPause(false)}
                >
                  Continue
                </Button>

              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog open={gameOverAlert} as="div" className="relative z-10 focus:outline-none" onClose={() => setGameOverAlert(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-red-900">
                Game Over
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                The Blocks All Over !!
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                  onClick={restartGame}
                >
                  Play Again ?
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => setGameOverAlert(false)}
                >
                  Later
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="flex flex-row md:flex-row justify-center items-start  gap-6 mb-[60px]">

        <div className="flex flex-row md:flex-row justify-center  mt-0 gap-6  " >

          <div className="flex flex-row  justify-center items-start bg-[#22374E] rounded-lg shadow-lg  w-full p-5">


            <div className="flex " ref={containerRef}>
              <canvas
                ref={tetrisRef}
                width={gridWidth * 24}
                height={gridHeight * 24}
                className="rounded-lg"

              />
            </div>
            <div className="flex flex-col justify-start w-full md:hidden ps-5  h-full">

              <div className=" rounded-lg  justify-between  mb-5 ">
                <div className="">
                  <label htmlFor="price" className="block text-md/6 font-medium text-white-900">Score</label>
                  <div className="mt-2">
                    <div className=" items-center rounded-md  gap-0.5 bg-[#111]" >
                      <h2 className="text-lg/6">{score}</h2>

                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <label htmlFor="price" className=" text-md/6 font-medium text-white-900">Next Block</label>
                <canvas
                  ref={previewRef}
                  width={gridWidthPrev * 15}
                  height={gridWidthPrev * 15}
                  className="border border-gray-400/50 rounded-lg"
                />

              </div>
            </div>


          </div>


          <div className="md:flex hidden flex-col gap-4 w-full sm:max-w-sm ">
            <Card className="bg-gradient-to-br  from-cyan-500/20 to-purple-800/10 border border-cyan-400 rounded-2xl shadow-xl">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-cyan-400">Score</h2>
                <p className="text-3xl font-bold text-cyan-500">{score.toLocaleString()}</p>
                {gameOver && <p className="text-red-500 mt-2 font-semibold">Game Over</p>}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border border-purple-500 rounded-2xl shadow-xl">
              <CardContent className="p-4">
                <div className="">
                <label htmlFor="price" className=" text-md/6 font-medium text-white-900">Next Block</label>
                <canvas
                  ref={previewDesktop}
                  width={gridWidthPrev * 20}
                  height={gridWidthPrev * 20}
                  className=""
                />

              </div>
              </CardContent>
            </Card>

            {/* <Button className="bg-green-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
              setIsOpen(true)
            }}>Daily Mission</Button>
            <Button className="bg-green-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
              setIsOpen(true)
            }}>Claim Reward</Button> */}
            {/* <Button className="bg-cyan-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
            restartGame();
          }}>{started ? "Restart" : "Start"} Game</Button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-row   w-full justify-between md:hidden " style={{ position: "fixed", bottom: 0, left: 0, minWidth: "100vw", padding: 10, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "20px 20px 0px 0px" }}>


        <Button className="bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl m-1 flex-1 flex flex-row justify-center align-center py-5" onClick={() => handleButtonClick("left")}>
          <FaChevronCircleLeft size={20} />
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl m-1 flex-1 flex flex-row justify-center align-center py-5" onClick={() => handleButtonClick("right")}>
          <FaChevronCircleRight size={20} />
        </Button>

        <Button className="bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl m-1 flex-1 flex flex-row justify-center align-center py-5" onClick={() => handleButtonClick("down")}>
          <FaChevronCircleDown size={20} />
        </Button>

        <Button className="bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl m-1 flex-1 flex flex-row justify-center align-center py-5" onClick={() => handleButtonClick("rotate")}>
          <FaRedo size={20} />
        </Button>
        <Button className="bg-red-600 hover:bg-cyan-800 text-white rounded-xl m-1 flex-1 flex flex-row justify-center align-center py-5" onClick={() => handleButtonClick("drop")}>
          <FaAngleDoubleDown size={20} />
        </Button>

      </div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Under Development
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                this feature not avaliable on Beta Testing.
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


    </div >
  );
};

export default dynamic(() => Promise.resolve(FuturisticTetris), { ssr: false });

