

export const board = {
    ROWS: 20,
    COLS: 10,
    BLOCK_SIZE: 24,
    gridWidth: 10,
    gridHeight: 20,
    gridWidthPrev: 6,
    gridHeightPrev: 5,
}

export const initialPrevGrid = Array(board.gridHeightPrev).fill(null).map(() => Array(board.gridWidthPrev).fill(0));


export const initialGrid = Array(board.gridHeight).fill(null).map(() => Array(board.gridWidth).fill(0));


export const createBoard = () => Array.from({ length: board.gridHeight }, () => Array(broad.gridWidth).fill(0));


export const futuristicColors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f", "#fff"];
export const tetrominos = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
];



export const colors = [
    '#000000', // empty
    '#00f0f0', // I
    '#f0f000', // O
    '#a000f0', // T
    '#f0a000', // L
    '#0000f0', // J
    '#00f000', // S
    '#f00000', // Z
];
export const blockType = [
  {
    name: "blockWood",
    price: 1000,
    point: 1.2,
    label: "Wood Block (Lv 1)",
    level: 1,
    desc: "Basic block with a small point boost.",
  },
  {
    name: "blockZigzag",
    price: 4000,
    point: 1.7,
    label: "Zap Block (Lv 2)",
    level: 2,
    desc: "Zigzag shape with better point gain.",
  },
  {
    name: "blockGlow",
    price: 10000,
    point: 2,
    label: "Glow Block (Lv 3)",
    level: 3,
    desc: "Glows and gives more points.",
  },
  {
    name: "blockMetal",
    price: 20000,
    point: 2.5,
    label: "Block Metal (Lv 4)",
    level: 4,
    desc: "Metallic block with strong bonus.",
  },
  {
    name: "glow_block",
    price: 50000,
    point: 5,
    label: "Neon Block (Lv 5)",
    level: 5,
    desc: "Top-tier block with max points.",
  },
];



export const missionType = {
    "Daily": "Score",
    // "Weekly": "Cleared Lines"
}

export const avatars = [
  { id: 1, filename: "avatar_1.webp" },
  { id: 2, filename: "avatar_2.webp" },
  { id: 3, filename: "avatar_3.webp" },
  { id: 4, filename: "avatar_4.webp" },
  { id: 5, filename: "avatar_5.webp" },
  { id: 6, filename: "avatar_6.webp" },
  { id: 7, filename: "avatar_7.webp" },
  { id: 8, filename: "avatar_8.webp" },
  { id: 9, filename: "avatar_9.webp" },
  { id: 10, filename: "avatar_10.webp" }
];


export const categories =
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

    // // "Weekly": [
    // //     {
    // //         id: 1,
    // //         title: 'Nerd Block Breaker',
    // //         desc: 'You have a good time! Break More Block!',
    // //         minScore: 5000,
    // //         rewards: 50000,
    // //         notCleared: false,
    // //         active: true,
    // //         claimable: false,
    // //         isClaimed: false
    // //     },
    // //     {
    // //         id: 2,
    // //         title: "Psychopath Block Breaker",
    // //         desc: 'are you okay? talk to me.',
    // //         minScore: 10000,
    // //         rewards: 100000,
    // //         notCleared: true,
    // //         active: false,
    // //         claimable: false,
    // //         isClaimed: false
    // //     },
    // //     {
    // //         id: 3,
    // //         title: "Jobless Block Breaker",
    // //         desc: 'you better find a job...',
    // //         minScore: 15000,
    // //         rewards: 150000,
    // //         notCleared: true,
    // //         active: false,
    // //         claimable: false,
    // //         isClaimed: false
    // //     },

    // ],
}

