import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import Image from "next/image";

const gridWidth = 10;
const gridHeight = 20;
const initialGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(0));

const futuristicColors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f", "#fff"];

const randomTetromino = () => {
  const tetrominos = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
  ];
  const index = Math.floor(Math.random() * tetrominos.length);
  return { shape: tetrominos[index], color: futuristicColors[index], row: 0, col: 3 };
};

const canMove = (grid, tetromino, offsetRow = 0, offsetCol = 0) => {
  return tetromino.shape.every((row, rIdx) =>
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

const mergeTetromino = (grid, tetromino) => {
  const newGrid = grid.map(row => [...row]);
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

const clearLines = (grid) => {
  let cleared = 0;
  const newGrid = grid.filter(row => {
    if (row.every(cell => cell !== 0)) {
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
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(randomTetromino());
  const intervalRef = useRef(null);

  useEffect(() => {
    const gameLoop = () => {
      if (canMove(grid, current, 1, 0)) {
        setCurrent(prev => ({ ...prev, row: prev.row + 1 }));
      } else {
        const merged = mergeTetromino(grid, current);
        const { newGrid, cleared } = clearLines(merged);
        setScore(prev => prev + cleared * 100);
        setGrid(newGrid);
        setCurrent(randomTetromino());
      }
    };

    intervalRef.current = setInterval(gameLoop, 800);
    return () => clearInterval(intervalRef.current);
  }, [grid, current]);

  const displayGrid = mergeTetromino(grid, current);

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-6" style={{ background: "linear-gradient(to bottom right, #0a1624, #0a1624, #0a1624)" }}>
      {/* Title and Social Media */}
      <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row justify-between items-center px-4 z-50">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="TetrisChain Logo" width={200} height={40}  />
        </div>
        <div className="flex gap-4 text-xl">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400"><FaTwitter /></a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaDiscord /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub /></a>
        </div>
      </div>

      {/* Game Area Centered */}
      <div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-6">
        {/* Game Grid */}
        <div className="grid grid-cols-10 gap-1 bg-gray-900 p-4 rounded-2xl shadow-lg border border-cyan-500">
          {displayGrid.flat().map((cell, i) => {
            const isValid = typeof cell === "number" && cell > 0 && cell <= futuristicColors.length;
            const color = isValid ? futuristicColors[(cell - 1) % futuristicColors.length] : "#111";
            return (
              <motion.div
                key={i}
                className="w-6 h-6 rounded-sm"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Card className="bg-gradient-to-br from-cyan-500/20 to-purple-800/10 border border-cyan-400 rounded-2xl shadow-xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-cyan-400">Score</h2>
              <p className="text-3xl font-bold text-cyan-500">{score.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border border-purple-500 rounded-2xl shadow-xl">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/30 flex items-center justify-center text-2xl font-bold text-white border border-cyan-300">
                🧬
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300">Solana Profile</h3>
                <p className="text-sm text-white/70">Wallet: <code>5K9...7U3</code></p>
                <p className="text-sm text-white/70">XP Level: 42</p>
              </div>
            </CardContent>
          </Card>

          <Button className="bg-green-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
            setGrid(initialGrid);
            setCurrent(randomTetromino());
            setScore(0);
          }}>Claim Reward</Button>
          <Button className="bg-cyan-600 hover:bg-cyan-800 rounded-xl" onClick={() => {
            setGrid(initialGrid);
            setCurrent(randomTetromino());
            setScore(0);
          }}>Restart Game</Button>
        </div>
      </div>
    </div>
  );
};

export default FuturisticTetris;
