import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import Image from "next/image";

const gridWidth = 10;
const gridHeight = 20;
const initialGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(0));

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

const mergeTetromino = (grid, tetromino, asGhost = false) => {
  const newGrid = grid.map(row => [...row]);
  tetromino.shape.forEach((row, rIdx) => {
    row.forEach((val, cIdx) => {
      if (val) {
        const y = tetromino.row + rIdx;
        const x = tetromino.col + cIdx;
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          newGrid[y][x] = asGhost ? -1 : futuristicColors.indexOf(tetromino.color) + 1;
        }
      }
    });
  });
  return newGrid;
};

const getGhostTetromino = (grid, tetromino) => {
  let dropRow = 0;
  while (canMove(grid, tetromino, dropRow + 1, 0)) {
    dropRow++;
  }
  return { ...tetromino, row: tetromino.row + dropRow };
};

const clearLines = (grid) => {
  let cleared = 0;
  const newGrid = grid.filter(row => {
    if (row.every(cell => cell > 0)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newGrid.length < gridHeight) {
    newGrid.unshift(Array(gridWidth).fill(0));
  }
  return { newGrid, cleared };
};

const FuturisticTetris = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [score, setScore] = useState(() => parseInt(localStorage.getItem("score")) || 0);
  const [current, setCurrent] = useState(randomTetromino());
  const [next, setNext] = useState(randomTetromino());
  const [hold, setHold] = useState(null);
  const [canHold, setCanHold] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => JSON.parse(localStorage.getItem("leaderboard")) || []);
  const intervalRef = useRef(null);

  const updateLeaderboard = (finalScore) => {
    const newEntry = { score: finalScore, date: new Date().toLocaleString() };
    const updated = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
    setLeaderboard(updated);
  };

  const handleKeyDown = useCallback((e) => {
    if (gameOver || paused) return;
    if (e.key === "ArrowLeft" && canMove(grid, current, 0, -1)) {
      setCurrent(prev => ({ ...prev, col: prev.col - 1 }));
    } else if (e.key === "ArrowRight" && canMove(grid, current, 0, 1)) {
      setCurrent(prev => ({ ...prev, col: prev.col + 1 }));
    } else if (e.key === "ArrowDown" && canMove(grid, current, 1, 0)) {
      setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
    } else if (e.key === "ArrowUp") {
      const rotated = rotateMatrix(current.shape);
      if (canMove(grid, current, 0, 0, rotated)) {
        setCurrent(prev => ({ ...prev, shape: rotated }));
      }
    } else if (e.key === " ") {
      let dropRow = 0;
      while (canMove(grid, current, dropRow + 1, 0)) dropRow++;
      setCurrent(prev => ({ ...prev, row: prev.row + dropRow }));
    } else if (e.key === "c" || e.key === "C") {
      if (canHold) {
        setCanHold(false);
        if (hold) {
          const temp = hold;
          setHold(current);
          setCurrent({ ...temp, row: 0, col: 3 });
        } else {
          setHold(current);
          setCurrent({ ...next, row: 0, col: 3 });
          setNext(randomTetromino());
        }
      }
    } else if (e.key.toLowerCase() === "p") {
      setPaused(p => !p);
    }
  }, [current, grid, hold, next, canHold, gameOver, paused]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!gameOver && !paused) {
      intervalRef.current = setInterval(() => {
        if (canMove(grid, current, 1, 0)) {
          setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
        } else {
          const merged = mergeTetromino(grid, current);
          const { newGrid, cleared } = clearLines(merged);
          const newTetromino = { ...next, row: 0, col: 3 };
          if (!canMove(newGrid, newTetromino)) {
            setGameOver(true);
            clearInterval(intervalRef.current);
            updateLeaderboard(score);
          } else {
            setScore(prev => {
              const updated = prev + cleared * 100;
              localStorage.setItem("score", updated);
              return updated;
            });
            setGrid(newGrid);
            setCurrent(newTetromino);
            setNext(randomTetromino());
            setCanHold(true);
          }
        }
      }, 800);
      return () => clearInterval(intervalRef.current);
    }
  }, [grid, current, next, gameOver, paused]);

  const ghost = getGhostTetromino(grid, current);
  const displayGrid = mergeTetromino(mergeTetromino(grid, ghost, true), current);

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-4 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
      <AnimatePresence>
        {paused && (
          <motion.div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-4xl font-bold z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Paused
          </motion.div>
        )}
        {gameOver && (
          <motion.div className="absolute inset-0 bg-red-900 bg-opacity-80 flex flex-col items-center justify-center text-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-4xl font-bold text-white">Game Over</h1>
            <p className="mt-4 text-lg">Your score: {score.toLocaleString()}</p>
            <Button className="mt-4 bg-cyan-600" onClick={() => {
              localStorage.removeItem("score");
              setGrid(initialGrid);
              setCurrent(randomTetromino());
              setNext(randomTetromino());
              setHold(null);
              setScore(0);
              setGameOver(false);
              setCanHold(true);
            }}>Restart</Button>
          </motion.div>
        )}
      </AnimatePresence>
<div className="relative min-h-screen text-white flex flex-col items-center justify-start p-4 sm:p-6 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-center px-4 z-50">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="TetrisChain Logo" width={160} height={40} />
        </div>
        <div className="flex gap-4 text-xl mt-2 sm:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400"><FaTwitter /></a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaDiscord /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub /></a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start mt-16 gap-6 w-full max-w-6xl">
        <div className="grid grid-cols-10 gap-0.5 bg-gray-900 p-2 sm:p-4 rounded-2xl shadow-lg border border-cyan-500">
          {displayGrid.flat().map((cell, i) => {
            const isValid = typeof cell === "number" && cell > 0 && cell <= futuristicColors.length;
            const color = isValid ? futuristicColors[(cell - 1) % futuristicColors.length] : "#111";
            return (
              <motion.div
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-4 w-full sm:max-w-sm">
          <Card className="bg-gradient-to-br from-cyan-500/20 to-purple-800/10 border border-cyan-400 rounded-2xl shadow-xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-cyan-400">Score</h2>
              <p className="text-3xl font-bold text-cyan-500">{score.toLocaleString()}</p>
              {gameOver && <p className="text-red-500 mt-2 font-semibold">Game Over</p>}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border border-purple-500 rounded-2xl shadow-xl">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Leaderboard</h3>
              <ul className="text-sm text-white/80 space-y-1">
                {leaderboard.map((entry, index) => (
                  <li key={index} className="flex justify-between">
                    <span>#{index + 1}</span>
                    <span>{entry.score}</span>
                    <span className="text-xs text-white/50">{entry.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button className="bg-green-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
            localStorage.removeItem("score");
            setGrid(initialGrid);
            setCurrent(randomTetromino());
            setScore(0);
            setGameOver(false);
          }}>Claim Reward</Button>
          <Button className="bg-cyan-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
            localStorage.removeItem("score");
            setGrid(initialGrid);
            setCurrent(randomTetromino());
            setScore(0);
            setGameOver(false);
          }}>Restart Game</Button>
        </div>
      </div>
    </div>
      {/* Render grid here (same as before, using displayGrid) */}
      {/* Render next piece, hold, score, leaderboard etc. */}
    </div>
  );
};

export default FuturisticTetris;
