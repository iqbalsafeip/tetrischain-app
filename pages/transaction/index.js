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




                






            </div >
        </div>

    );
};

export default dynamic(() => Promise.resolve(Leaderboard), { ssr: false });
