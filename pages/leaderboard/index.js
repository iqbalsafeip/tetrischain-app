"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause, FaHandHoldingUsd } from "react-icons/fa";
import ImageNext from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Popover, PopoverButton, PopoverPanel, Dialog, DialogPanel, DialogTitle, Radio, RadioGroup, Disclosure, DisclosureButton, DisclosurePanel, Label, Field, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { LuSettings, LuTimerReset, LuWallet } from "react-icons/lu";
import { FaRankingStar } from "react-icons/fa6";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useProgram } from "@/components/hooks/useProgram";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase";
import { displayWallet, sortByField } from "@/utils/general";


const wallets = [
    {
        address: "2u1XyPLUzAkHZmVZrBRB3M4BLxmsaxodfPe8zERuRHDb",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sophia",
        name: "Sophia Turner",
        score: 913
    },
    {
        address: "BpUUXxtmjmskAo6AZbBa3TfVo3t9JvHK98YKNvR3LYAB",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Mia",
        name: "Mia Lewis",
        score: 905
    },
    {
        address: "F1GQ6BQfLjR3smAuG1fYyPLzwXnMJNm8ok2MCMCAAPex",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Isabella",
        name: "Isabella Scott",
        score: 820
    },
    {
        address: "3h4vXBzAK8vcm4EfNdpEHfiE88MaZ2xVrAZEoEKFFX7P",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Olivia",
        name: "Olivia Bennett",
        score: 732
    },
    {
        address: "HqvNz5bXbyHTk5Ft2jkrkBquSZZHDVGVvzzgZ1UGEdXL",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Emma",
        name: "Emma Martinez",
        score: 681
    },
    {
        address: "9Da1byh3bSsjHJmhA7wrv6MuF8rheQ7nZD74ZJkzwoBv",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Liam",
        name: "Liam Anderson",
        score: 589
    },
    {
        address: "7LnUEzBfCpRm9qHndzCXekTjvE2GmAaAvW2Veb42Nx8c",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Noah",
        name: "Noah Richardson",
        score: 470
    },
    {
        address: "E2wPRZH7Mx3rKRjhd5VtqkW3XW1aDwCeFqQWCBLxWkAj",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Ethan",
        name: "Ethan Hughes",
        score: 410
    },
    {
        address: "8jXomTZfX15yFRbi1WCUqHE6phD9ZBkWut95T4eRG4De",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Benjamin",
        name: "Benjamin Clark",
        score: 298
    },
    {
        address: "5Y8o9y7xJG8cksvDrX5m6NsVC9vztQsLRXGZejbEzQNe",
        avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=James",
        name: "James Walker",
        score: 150
    }
];


const Leaderboard = () => {
    const [active, setActive] = useState(1)
    const [loading, setLoading] = useState(false)
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                let { data: leaderboard, error } = await supabase
                    .from('leaderboard')
                    .select('score, players(detail)')
                    .range(0, 9)
                console.log(leaderboard);
                setLoading(false)
                setLeaderboard(sortByField(leaderboard, "score"))
            } catch (error) {
                setLoading(false)
            }
        }

        getData()

    }, [])



    return (
        <div>

            {
                loading && (
                    <div id="loading-screen" class="absolute w-[100vw] min-h-[100vh] flex flex-col justify-center items-center  bg-grey-800/75 z-999999">
                        <div>
                            <div class="loadingspinner">
                                <div id="square1"></div>
                                <div id="square2"></div>
                                <div id="square3"></div>
                                <div id="square4"></div>
                                <div id="square5"></div>
                            </div>
                        </div>
                        <div class="text-xl font-medium text-white ">Loading...</div>
                    </div>
                )
            }
            <div className={`relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624] ${loading && 'blur-sm'}`}>
                <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-50 w-full">
                    <div className="flex items-center gap-1">
                        <ImageNext src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
                    </div>




                    <a href={"/"} className="px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-800 text-white rounded-xl flex flex-row justify-center align-center" >
                        <TiArrowBack size={18} />
                    </a>
                </div>




                {
                    active === 1 ? (
                        <div class="w-full max-w-md p-4 mb-20 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex items-center justify-between mb-4">
                                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Top 10 High Score</h5>

                            </div>
                            <div class="flow-root">
                                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        leaderboard.map((e) => (
                                            <li class="py-3 sm:py-4">
                                                <div class="flex items-center">
                                                    <div class="shrink-0">
                                                        <img class="w-10 h-10 rounded-full" src={`images/avatar/avatar_${e.players.detail.avatar}.webp`} alt="Neil image" />
                                                    </div>
                                                    <div class="flex-1 min-w-0 ms-4">
                                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {e.players.detail.username}
                                                        </p>
                                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {displayWallet(e.players.detail.custom_claims.address)}
                                                        </p>
                                                    </div>
                                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        {e.score}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>

                    ) : (
                        <div class="w-full max-w-md p-4 mb-20 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex items-center justify-between mb-4">
                                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Top 10 Player</h5>

                            </div>
                            <div class="flow-root">
                                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        Array(10).fill({ address: "2Jb5d9e2fwJhrgDkiTJXvdNw1e76FTV7b7gMXxFpPvx3" }).map((e) => (
                                            <li class="py-3 sm:py-4">
                                                <div class="flex items-center">
                                                    <div class="shrink-0">
                                                        <img class="w-8 h-8 rounded-full" src={"https://testingbot.com/free-online-tools/random-avatar/300"} alt="Neil image" />
                                                    </div>
                                                    <div class="flex-1 min-w-0 ms-4">
                                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            Isaac Bleirg
                                                        </p>
                                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {e.address.slice(0, 6) + (e.address.length > 6 ? "...." : "") + e.address.slice(e.address.length - 6, e.address.length)}
                                                        </p>
                                                    </div>
                                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        1200
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    )
                }




                <div class="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                    <div class="w-full">
                        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                            <button onClick={() => setActive(1)} type="button" class={`px-5 py-1.5 text-xs font-medium ${active === 1 ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}   rounded-lg`}>
                                High Score
                            </button>
                            <button disabled type="button" class={`px-5 py-1.5 text-xs font-medium ${active === 2 ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"} rounded-lg`}>
                                Top Players
                            </button>

                        </div>
                    </div>
                </div>



            </div >
        </div>

    );
};

export default dynamic(() => Promise.resolve(Leaderboard), { ssr: false });
