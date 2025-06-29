"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause, FaHandHoldingUsd } from "react-icons/fa";
import audio from "../config/audio";
import { useBlockImages } from "../hooks/useImageLoader";
import dynamic from "next/dynamic";
import { canMove, clearLines, getRandClearSound, getShadowPosition, mergeTetromino, mergeTetrominoPrev, randomTetromino, rotateMatrix, toAudio } from "@/utils/general";
import { board, colors, futuristicColors, initialGrid, initialPrevGrid, tetrominos } from "@/utils/constant";
import { FcExternal, FcReadingEbook } from "react-icons/fc";





const TetrisBoard = (props) => {
    const tetrisRef = useRef();
    const previewRef = useRef()
    const previewDesktop = useRef()
    const containerRef = useRef()
    const [grid, setGrid] = useState(initialGrid);
    const [gridPrev, setGridPrev] = useState(initialPrevGrid);
    const [score, setScore] = useState(() => 0);
    const [current, setCurrent] = useState(randomTetromino());
    const [nextTetro, setNextTetro] = useState(randomTetromino());
    const [gameOver, setGameOver] = useState(false);
    const intervalRef = useRef(null);
    const [gameState, setGameState] = useState("idle");
    const [started, setStarted] = useState(false)

    // Sound
    const gamePlay = toAudio(audio.gamePlay);
    const gameOverSound = toAudio(audio.gameOver);
    const drop = toAudio(audio.blockDownFast);
    const clear = toAudio(getRandClearSound());
    const move = toAudio(audio.blockMoving);
    const rotate = toAudio(audio.blockRotate);


    useEffect(() => {
        setCurrent(randomTetromino());

    }, [props?.currBlockType])

    const images = useBlockImages();
    const shadow = getShadowPosition(grid, current);
    const displayGrid = mergeTetromino(grid, current, shadow);
    const previewGrid = mergeTetrominoPrev(gridPrev, nextTetro);

    const ctxRef = useRef();
    useEffect(() => {
        ctxRef.current = tetrisRef.current?.getContext('2d');
    }, [props.started]);

    const drawNext = () => {
        const ctxPrev = previewRef.current?.getContext('2d');
        const ctxPrevDesktop = previewDesktop.current?.getContext('2d');

        ctxPrev?.clearRect(0, 0, board.gridWidthPrev * 15, board.gridHeightPrev * 15);
        ctxPrevDesktop.clearRect(0, 0, board.gridWidthPrev * 20, board.gridHeightPrev * 20);

        const drawPreview = (x, y, value) => {
            ctxPrev.fillStyle = value !== -1 ? colors[value] : "";


            if (value > 0) {
                const img = images[props?.currBlockType.name];
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
                const img = images[props?.currBlockType.name];
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

        ctx.clearRect(0, 0, board.COLS * board.BLOCK_SIZE, board.ROWS * board.BLOCK_SIZE);

        const drawCell = (x, y, value) => {
            ctx.fillStyle = value !== -1 ? colors[value] : "#111";

            if (value > 0) {
                const img = images[props?.currBlockType.name];
                if (img) {
                    ctx.drawImage(img, x * board.BLOCK_SIZE, y * board.BLOCK_SIZE, board.BLOCK_SIZE, board.BLOCK_SIZE); // Draw image at x=50, y=50 with width and height of 100

                    ctx.globalAlpha = 0.5;
                    ctx.fillRect(x * board.BLOCK_SIZE, y * board.BLOCK_SIZE, board.BLOCK_SIZE, board.BLOCK_SIZE);
                    ctx.globalAlpha = 1.0;
                }
            } else {
                ctx.fillStyle = value !== -1 ? "#52769e" : "#345a85";
                ctx.fillRect(x * board.BLOCK_SIZE, y * board.BLOCK_SIZE, board.BLOCK_SIZE, board.BLOCK_SIZE);
            }

            ctx.strokeStyle = '#6387b0';
            ctx.strokeRect(x * board.BLOCK_SIZE, y * board.BLOCK_SIZE, board.BLOCK_SIZE, board.BLOCK_SIZE);
        };



        displayGrid.forEach((row, y) => {
            row.forEach((cell, x) => drawCell(x, y, cell));
        });

        drawNext();
    };


    const pieceRef = useRef(current);
    const gridRef = useRef(grid);
    const nextRef = useRef(nextTetro);
    const gameOverRef = useRef(gameOver);

    const finalizeClear = (newGrid, cleared) => {
        setScore(prev => {
            const updated = prev + (cleared * props?.currBlockType.point) * 100;
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
            setGameState('GameOver');
            setStarted(false)
            props.setGameOverAlert(true);
            props.gameOver(score);
            return; // Stop game loop
        } else {
            if (cleared > 0) clear.play();

            if (clearedRows.length > 0) {

                finalizeClear(newGrid, cleared);
            } else {

                finalizeClear(newGrid, cleared);
            }


        }
    };


    const handleKeyDown = (e) => {
        if (gameOver || !props.started || props.isPause) return;

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

    const handleButtonClick = (dir) => {
        if (gameOver || !props.started || props.isPause) return;

        if (["left", "right", "down"].includes(dir)) {
            applyMovement(dir);
        } else if (dir === "rotate") {
            applyRotation();
        } else if (dir === "drop") {
            applyHardDrop();
        }
    };

    useEffect(() => {
        const handleUserInteraction = () => {
            switch (gameState) {
                case 'idle': {
                    gamePlay.pause();
                    gamePlay.loop = true;
                    gamePlay.play().catch(err => console.error(err));
                    break;
                }
                case 'GameOver': {
                    gamePlay.pause();
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
    }, [gameState, props.volume])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [grid, current, gameOver, props?.started]);


    useEffect(() => {
        if (!props.started || gameOver || props.isPause) return;

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
    }, [grid, current, gameOver, props.started, props.isPause]);

    useEffect(() => {
        if (!props.started || gameOver || props.isPause) return;

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
                if (cleared > 0) clear.play();

                if (!canMove(newGrid, nextRef.current)) {
                    setGameOver(true);
                    setGameState('GameOver');
                    setStarted(false)
                    props.setGameOverAlert(true);
                    props.gameOver(score);
                    return; // Stop game loop
                }

                if (clearedRows.length > 0) {
                    finalizeClear(newGrid, cleared);
                } else {
                    finalizeClear(newGrid, cleared);
                }

            };
        }

        intervalRef.current = setInterval(gameLoop, 800);

        return () => clearInterval(intervalRef.current);
    }, [grid, current, gameOver, props?.started, props?.isPause]);

    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
            {!props.started && <div id="loading-screen" class="absolute w-[60vw] min-h-[60vh] flex flex-col justify-center items-center  bg-grey-800/75 ">
                <div>
                    <div class="loadingspinner">
                        <div id="square1"></div>
                        <div id="square2"></div>
                        <div id="square3"></div>
                        <div id="square4"></div>
                        <div id="square5"></div>
                    </div>
                </div>
                <div class="text-lg font-medium text-white mt-10">Waiting Player...</div>
                <button onClick={() => props.setPlay(true)} className=" px-6 py-3 font-semibol bg-gray-800 hover:bg-gray-700 mt-10 text-white rounded-md min-w-lg flex flex-row justify-between items-center " >
                    <FcReadingEbook size={24} /> <span className='ms-2 font-medium'>Play Now!</span>
                </button>
            </div>}
            {props.loadingGame && <div id="loading-screen" class="absolute w-[60vw] min-h-[60vh] flex flex-col justify-center items-center  bg-grey-800/75 ">
                <div>
                    <div class="loadingspinner">
                        <div id="square1"></div>
                        <div id="square2"></div>
                        <div id="square3"></div>
                        <div id="square4"></div>
                        <div id="square5"></div>
                    </div>
                </div>
                <div class="text-lg font-medium text-white mt-10">System Updating...</div>
            </div>}
            <div className={`${!props.started ? "hidden" : ""} flex flex-row md:flex-row justify-center items-start  gap-6 mb-[60px]`}>
                <div className="flex flex-row md:flex-row justify-center  mt-0 gap-6  " >
                    <div className="flex flex-row  justify-center items-start bg-[#22374E] rounded-lg shadow-lg  w-full p-5">
                        <div className="flex " ref={containerRef}>
                            <canvas
                                ref={tetrisRef}
                                width={board.gridWidth * 24}
                                height={board.gridHeight * 24}
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
                                    width={board.gridWidthPrev * 15}
                                    height={board.gridWidthPrev * 15}
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
                                        width={board.gridWidthPrev * 20}
                                        height={board.gridWidthPrev * 20}
                                        className=""
                                    />

                                </div>
                            </CardContent>
                        </Card>

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
        </div>
    );
};

export default dynamic(() => Promise.resolve(TetrisBoard), { ssr: false });

