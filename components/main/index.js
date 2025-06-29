"use client";
import React, { useState, useEffect, useRef } from "react";
import { useProgram } from "../hooks/useProgram";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useBlockImages } from "../hooks/useImageLoader";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase";
import TetrisBoard from "./TetrisBoard";
import Header from "../header";
import { blockType, initialGrid, initialPrevGrid } from "@/utils/constant";
import { formatDateComparable, formatNumber, randomTetromino } from "@/utils/general";
import { FcSportsMode } from "react-icons/fc";


const FuturisticTetris = ({ user, className }) => {

  const tetrisRef = useRef();

  const [grid, setGrid] = useState(initialGrid)
  const [score, setScore] = useState(() => 0);
  const [clearedLines, setClearedLines] = useState(() => 0);
  const [myBalance, setBalance] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isPlay, setPlay] = useState(false);
  const [isPause, setPause] = useState(false);
  const [gameOverAlert, setGameOverAlert] = useState(false);
  const [currBlockType, setCurrBlockType] = useState(blockType[0]);

  const [gridPrev, setGridPrev] = useState(initialPrevGrid);
  const [current, setCurrent] = useState(randomTetromino());
  const [nextTetro, setNextTetro] = useState(randomTetromino());
  const [gameState, setGameState] = useState("idle");

  const [loadingGame, setLoadingUpdate] = useState(false);



  const restartGame = (callback) => {
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


  const doGameOver = async (score) => {
    try {
      setLoadingUpdate(true);
      const todayHighscore = score;
      const today = formatDateComparable(Date.now());
      const res = await supabase.auth.getUser();
      const highScore = res.data.user.user_metadata?.highScore || 0;
      const lastDayScore = res.data.user.user_metadata?.todayHighscore || 0;
      const lastPlay = res.data.user.user_metadata?.lastPlay || formatDateComparable(Date.now);



      await supabase.auth.updateUser({
        data: {
          highScore: todayHighscore > highScore ? todayHighscore : highScore,
          todayHighscore: today >= lastPlay ? todayHighscore : lastDayScore,
          lastPlay: today
        }
      })

      if (score > highScore) {
        await supabase.from('leaderboard').update({ score: score }).eq("user_id", res.data.user.id);
      }


      setPlay(e => true)
      setLoadingUpdate(false)
    } catch (error) {
      console.log(error);

    }

  }



  return (
    <div className={`relative max-h-[100vh]  text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624] ${className} `}>
      <Header
        currBlockType={currBlockType}
        setCurrBlockType={setCurrBlockType}
        blockType={blockType}
        restartGame={restartGame}
        setPlay={setPlay}
        setPause={setPause}
        isPlay={isPlay}
        isPause={isPause}
        user={user}
        setGameOverAlert={setGameOverAlert}
      >
            <div class="flex flex-col justify-center items-center mt-2 ">
              <div class="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800  dark:shadow-none">
                <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                  <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' class="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                    <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                      <img class="h-full w-full rounded-full" src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png' alt="" />
                    </div>
                </div>
                <div class="mt-16 flex flex-col items-center">
                  <h4 class="text-xl font-bold text-indigo-700 ">
                    Adela Parkson
                  </h4>
                  <p class="text-base font-normal text-gray-600">{user.username}</p>
                </div>
                <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
                  <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-indigo-700 ">17</p>
                    <p class="text-[12px] font-normal text-gray-600">Mission Clered</p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-indigo-700 ">
                      {formatNumber(user.balanec)}
                    </p>
                    <p class="text-[12px] font-normal text-gray-600">Balance</p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-indigo-700 ">
                      {formatNumber(user.highScore)}
                    </p>
                    <p class="text-[12px] font-normal text-gray-600">HighScore</p>
                  </div>
                </div>
              </div>
            </div>
         

        <div class="flex flex-col justify-center items-center h-[100vh]">
          <div
            class="relative flex max-w-[500px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800  dark:shadow-none"
          >
            <div class="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800  dark:shadow-none">
              <div class="mb-8 w-full">
                <h4 class="text-xl font-bold text-indigo-700 ">
                  All projects
                </h4>
                <p class="mt-2 text-base text-gray-600">
                  Here you can find more details about your projects. Keep you user
                  engaged by providing meaningful information.
                </p>
              </div>
              <div class="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div class="flex items-center">
                  <div class="">
                    <img
                      class="h-[83px] w-[83px] rounded-lg"
                      src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image1.png?raw=true"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <p class="text-base font-medium text-indigo-700 ">
                      Technology behind the Blockchain
                    </p>
                    <p class="mt-2 text-sm text-gray-600">
                      Project #1 .
                      <a
                        class="ml-1 font-medium text-brand-500 hover:text-brand-500 "
                        href=" "
                      >
                        See product details
                      </a>
                    </p>
                  </div>
                </div>
                <div class="mr-4 flex items-center justify-center text-gray-600 ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
                  </svg>
                </div>
              </div>
              <div class="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div class="flex items-center">
                  <div class="">
                    <img
                      class="h-[83px] w-[83px] rounded-lg"
                      src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <p class="text-base font-medium text-indigo-700 ">
                      Technology behind the Blockchain
                    </p>
                    <p class="mt-2 text-sm text-gray-600">
                      Project #1 .
                      <a
                        class="ml-1 font-medium text-brand-500 hover:text-brand-500 "
                        href=" "
                      >
                        See product details
                      </a>
                    </p>
                  </div>
                </div>
                <div class="mr-4 flex items-center justify-center text-gray-600 ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
                  </svg>
                </div>
              </div>
              <div class="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div class="flex items-center">
                  <div class="">
                    <img
                      class="h-[83px] w-[83px] rounded-lg"
                      src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image3.png?raw=true"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <p class="text-base font-medium text-indigo-700 ">
                      Technology behind the Blockchain
                    </p>
                    <p class="mt-2 text-sm text-gray-600">
                      Project #1 .
                      <a
                        class="ml-1 font-medium text-brand-500 hover:text-brand-500 "
                        href=" "
                      >
                        See product details
                      </a>
                    </p>
                  </div>
                </div>
                <div class="mr-4 flex items-center justify-center text-gray-600 ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="fixed bottom-4  transform  inline-flex  mx-auto justify-between bg-blue-600 w-11/12 rounded-3xl">
          <a
            aria-current="page"
            class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-white flex-grow"
            href="#"
          >
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span class="sr-only">Home</span>
          </a>
          <a
            class="inline-flex flex-col items-center text-xs font-medium text-blue-400 py-3 px-4 flex-grow"
            href="#"
          >
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <span class="sr-only">Upload</span>
          <button class="relative inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 flex-grow">
            <div class="absolute bottom-5 p-3 rounded-full border-4 border-white bg-gray-100">
              <FcSportsMode size={30} />  
            </div>
            <span class="sr-only">Chat</span>
          </button>
          <a
            class="inline-flex flex-col items-center text-xs font-medium text-blue-400 py-3 px-4 flex-grow"
            href="#"
          >
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </a>
          <a
            class="inline-flex flex-col items-center text-xs font-medium text-blue-400 py-3 px-4 flex-grow"
            href="#"
          >
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Profile</span>
          </a>
        </div>
      </Header>

    </div>

  );
};

export default dynamic(() => Promise.resolve(FuturisticTetris), { ssr: false });

