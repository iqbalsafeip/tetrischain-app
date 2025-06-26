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

// Remaining code truncated for brevity
