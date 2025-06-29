"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause, FaHandHoldingUsd } from "react-icons/fa";
import ImageNext from "next/image";

import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useProgram } from "@/components/hooks/useProgram";
import dynamic from "next/dynamic";
import { blockType } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { formatNumber, formatShortNumber } from "@/utils/general";
import { supabase } from "@/utils/supabase";



const Market = (props) => {
    const [active, setActive] = useState(1)


    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
            <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-50 w-full">
                <div className="flex items-center gap-1">
                    <ImageNext src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
                </div>



                <a href={"/"} className="px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-800 text-white rounded-xl flex flex-row justify-center align-center" >
                    <TiArrowBack size={18} />
                </a>
            </div>

            <article
                className="fixed left-[8px] bottom-0 mb-[60px] z-50  flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
                <span className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </span>

                <div>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{props.user.balance}</p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">$TRSCHN</p>
                </div>
            </article>

            {active === 1 ?
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mb-20">
                    {
                        blockType.map((e) => (
                            <div class="">

                                <div class="relative flex w-42 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                    <div class="relative mx-4 mt-4 h-32 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                        <img
                                            src={`/images/${e.name}.webp`}
                                            class="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div class="p-6">
                                        <div class="mb-2 flex items-center justify-between">
                                            <p class="block font-sans text-base font-bold leading-relaxed text-blue-gray-900 antialiased">
                                                {e.label}
                                            </p>
                                            <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">

                                            </p>
                                        </div>
                                        <p class="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                                            {e.desc}
                                        </p>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <button
                                            class="flex flex-row gap-5 justify-center items-center w-full select-none rounded-lg bg-indigo-900 py-3 px-6 text-center align-center font-sans text-sm font-medium  text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                        >
                                            <ImageNext src="/images/icon.webp" alt="TetrisChain Logo" width={30} height={40} />  <div>{formatNumber(e.price)} $TRSCHN </div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </div> : <div className="h-[80vh] w-[80vw] flex flex-col justify-center items-center gap-5" >

                    <ImageNext src="/images/icon.webp" alt="TetrisChain Logo" width={120} height={300} objectFit="contain" />
                    <h1 className="text-xl font-bold" >Coming Soon</h1>
                </div>
            }

            <div class="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div class="w-full">
                    <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                        <button onClick={() => setActive(1)} type="button" class={`px-5 py-1.5 text-xs font-medium ${active === 1 ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}   rounded-lg`}>
                            Non - NFT Block
                        </button>
                        <button onClick={() => setActive(2)} type="button" class={`px-5 py-1.5 text-xs font-medium ${active === 2 ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"} rounded-lg`}>
                            NFT Block
                        </button>

                    </div>
                </div>
            </div>


         



        </div >
    );
};

export default dynamic(() => Promise.resolve(Market), { ssr: false });
