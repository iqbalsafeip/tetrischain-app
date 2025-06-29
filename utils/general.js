import audio from "@/components/config/audio";
import { useRef } from "react";
import { board, futuristicColors, tetrominos } from "./constant";
import { supabase } from "./supabase";

export const toAudio = src => {
    const temp = useRef(new Audio(src));

    return temp.current;
}

export const getRandClearSound = _ => {
    const getRand = () => {
        const num = Math.round(Math.random() * 5) + 1;
        const clearAudio = audio.blockClear(num);
        return clearAudio
    }

    return getRand();
}

export const displayWallet = address => {
    return address.slice(0, 6) + (address.length > 6 ? "...." : "") + address.slice(address.length - 6, address.length);
}

export function formatShortNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export function formatDateComparable(dateInput) {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function formatNumber(n) {
  return n.toLocaleString();
}

export const rotateMatrix = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
export const randomTetromino = () => {
    const index = Math.floor(Math.random() * tetrominos.length);
    return { shape: tetrominos[index], color: futuristicColors[index], row: 0, col: 3 };
};

export const canMove = (grid, tetromino, offsetRow = 0, offsetCol = 0, shape = null) => {
    const shapeToCheck = shape || tetromino.shape;
    return shapeToCheck.every((row, rIdx) =>
        row.every((val, cIdx) => {
            if (!val) return true;
            const newRow = tetromino.row + rIdx + offsetRow;
            const newCol = tetromino.col + cIdx + offsetCol;
            return (
                newRow >= 0 &&
                newRow < board.gridHeight &&
                newCol >= 0 &&
                newCol < board.gridWidth &&
                grid[newRow][newCol] === 0
            );
        })
    );
};

export const collides = (grid, tetromino, rowOffset = 0, colOffset = 0) => {
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

export const getShadowPosition = (grid, tetromino) => {
    const shadow = { ...tetromino, row: tetromino.row };

    while (!collides(grid, shadow, 1, 0)) {
        shadow.row += 1;
    }

    return shadow;
};

export const mergeTetromino = (grid, tetromino, shadowTetromino = null) => {
    const newGrid = grid.map(row => [...row]);
    if (shadowTetromino) {
        shadowTetromino.shape.forEach((row, rIdx) => {
            row.forEach((val, cIdx) => {
                if (val) {
                    const y = shadowTetromino.row + rIdx;
                    const x = shadowTetromino.col + cIdx;
                    if (y >= 0 && y < board.gridHeight && x >= 0 && x < board.gridWidth && newGrid[y][x] === 0) {
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
                if (y >= 0 && y < board.gridHeight && x >= 0 && x < board.gridWidth) {
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

export const mergeTetrominoPrev = (grid, tetromino) => {
    const newGrid = grid.map(row => [...row]);
    tetromino.shape.forEach((row, rIdx) => {
        row.forEach((val, cIdx) => {
            if (val) {
                const y = tetromino.row + rIdx + 1;
                const x = tetromino.col + cIdx - 2;
                if (y >= 0 && y < board.gridHeightPrev && x >= 0 && x < board.gridWidthPrev) {
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

export const clearLines = (grid) => {
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

    while (newGrid.length < board.gridHeight) {
        newGrid.unshift(Array(board.gridWidth).fill(0));
    }
    return { newGrid, cleared, clearedRows };
};

export function sortByField(arr, field, ascending = true) {
  return arr.slice().sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1;
    if (a[field] > b[field]) return ascending ? 1 : -1;
    return 0;
  });
}

export async function updateRawMetaBulk(score, id){
    try {
        await supabase.from('leaderboard').update({score: score}).eq("user_id", id);
    } catch (error) {
        
    }
}