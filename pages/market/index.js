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
import UnAuthScreen from "@/components/main/UnAuthScreen";
import dynamic from "next/dynamic";



const futuristicColors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f", "#fff"];




const colors = [
    '#000000', // empty
    '#00f0f0', // I
    '#f0f000', // O
    '#a000f0', // T
    '#f0a000', // L
    '#0000f0', // J
    '#00f000', // S
    '#f00000', // Z
];

const blockType = [
    {
        name: "blockWood",
        price: 1000,
        point: 1.2,
        label: "Wood Block (Lv 1)"
    },
    {
        name: "blockZigzag",
        price: 4000,
        point: 1.7,
        label: "Zap Block (Lv 2)"
    },
    {
        name: "blockGlow",
        price: 10000,
        point: 2,
        label: "Glow Block (Lv 3)"
    },
    {
        name: "blockMetal",
        price: 20000,
        point: 2.5,
        label: "Block Metal (Lv 4)"
    },
    {
        name: "glow_block",
        price: 50000,
        point: 5,
        label: "Neon Block (Lv 5)"
    },


]


const missionType = {
    "Daily": "Score",
    "Weekly": "Cleared Lines"
}

const categories =
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

    "Weekly": [
        {
            id: 1,
            title: 'Nerd Block Breaker',
            desc: 'You have a good time! Break More Block!',
            minScore: 5000,
            rewards: 50000,
            notCleared: false,
            active: true,
            claimable: false,
            isClaimed: false
        },
        {
            id: 2,
            title: "Psychopath Block Breaker",
            desc: 'are you okay? talk to me.',
            minScore: 10000,
            rewards: 100000,
            notCleared: true,
            active: false,
            claimable: false,
            isClaimed: false
        },
        {
            id: 3,
            title: "Jobless Block Breaker",
            desc: 'you better find a job...',
            minScore: 15000,
            rewards: 150000,
            notCleared: true,
            active: false,
            claimable: false,
            isClaimed: false
        },

    ],
}

const FuturisticTetris = () => {


    const [score, setScore] = useState(() => 0);
    const [clearedLines, setClearedLines] = useState(() => 0);
    const [myBalance, setBalance] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [isSetting, setSetting] = useState(false);
    const [currBlockType, setCurrBlockType] = useState(blockType[0]);
    const [isMission, setMission] = useState(false)
    const [accountInfo, setAccountInfo] = useState({
        address: "",
        solBalance: ""
    })

    const [listMissions, setListMission] = useState(() => categories)

    const [missionActive, setMissionActive] = useState("Daily")


    const [active, setActive] = useState(1);













    const { balance,
        publicKey,
        connected,
        connection, account } = useProgram();









    useEffect(() => {
        const airdropDevnetSol = async () => {
            if (!publicKey) return;



            try {
                const _balance = await connection.getBalance(publicKey);
                const solBalance = _balance / LAMPORTS_PER_SOL;
                const address = publicKey.toString()
                setAccountInfo(() => ({
                    address: address.slice(0, 6) + (address.length > 6 ? "...." : "") + address.slice(address.length - 6, address.length),
                    solBalance: solBalance
                }))

            } catch (error) {
                console.log(error);
            }
        };

        airdropDevnetSol();
    }, [publicKey]);



















    const claimReward = (minScore, id, mstype) => {

        if (score < minScore) return false;

        const tempMission = listMissions[mstype][id - 1];

        let nextMission = false
        if (id < listMissions[mstype].length) {

            nextMission = listMissions[mstype][id];
        }

        setListMission((prev) => {
            let currMission = [
                ...prev[mstype].filter((e) => ![id, id + 1].includes(e.id)),
                {
                    ...tempMission,
                    notCleared: false,
                    active: false,
                    claimable: false,
                    isClaimed: true
                }
            ]

            if (id < listMissions[mstype].length) {
                currMission = [...currMission, {
                    ...nextMission,
                    notCleared: false,
                    active: true,
                    claimable: false,
                    isClaimed: false
                }]
            }
            const lude = {
                ...prev, [mstype]: currMission.sort((a, b) => a.id > b.id ? 1 : -1)
            }


            return lude
        })

        setBalance((prev) => prev + tempMission.rewards)

    }


    if (!connected) {
        return (
            <UnAuthScreen />
        );
    }

    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
            <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-50 w-full">
                <div className="flex items-center gap-1">
                    <ImageNext src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
                </div>


                <Popover className=" z-100">
                    <div className="flex flex-row">

                        <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold me-2 ">
                            <span>Menu</span>
                            <ChevronDownIcon aria-hidden="true" className="size-5" />
                        </PopoverButton>
                        <a href={"/"} className="px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-800 text-white rounded-xl flex flex-row justify-center align-center" >
                            <TiArrowBack size={18} />
                        </a>
                    </div>
                    <PopoverPanel
                        transition
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                    >
                        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <FaAddressCard aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg">
                                            Wallet
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">Address : {accountInfo.address}</p>
                                        <p className="mt-1 text-gray-600">Sol Balance : {accountInfo.solBalance}</p>
                                        <WalletMultiButton />
                                    </div>
                                </div>
                                {/* <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <FaTasks aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" onClick={() => setMission(true)}>
                      Daily Mission
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">Complete Daily Mission to get rewards</p>
                  </div>
                </div> */}
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <FaWallet aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" onClick={() => setIsOpen(true)}>
                                            Balance
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600 font-semibold">$TRSCHN Balance : {myBalance}</p>
                                    </div>
                                </div>
                                {/* <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <ShoppingCartIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <a className="font-semibold text-gray-900 text-lg" onClick={() => setSetting(true)}>
                      Market
                    </a>
                    <p className="mt-1 text-gray-600 font-semibold">Place where you can buy Non - NFT & NFT Collection Blocks</p>
                  </div>
                </div> */}
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center" onClick={() => setSetting(true)}>
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <LuSettings aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" >
                                            Settings
                                        </a>
                                        <p className="mt-1 text-gray-600 font-semibold">Open settings to optimize your Playground</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </PopoverPanel>
                </Popover>

            </div>

            <Dialog open={isMission} as="div" className="relative z-10 focus:outline-none" style={{ zIndex: 999 }} onClose={() => setMission(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-black/70 p-6 backdrop-blur-2xl duration-300 ease-out"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white mb-3">
                                Clear All Mission and Gain Rewards !
                            </DialogTitle>
                            <TabGroup >
                                <TabList className="flex gap-4">
                                    {Object.keys(listMissions).map((mstype) => (
                                        <Tab
                                            key={mstype}
                                            className={`rounded-full px-4 py-2 text-sm/6 font-semibold text-white shadow   ${missionActive === mstype ? "bg-white/10" : "bg-white/5"}`}
                                        >
                                            {mstype}
                                        </Tab>
                                    ))}
                                </TabList>
                                <TabPanels className="mt-3">
                                    {Object.keys(listMissions).map((mstype) =>
                                        <TabPanel key={mstype} className={`rounded-xl  p-3`} as="div" onClick={e => false} >
                                            {
                                                listMissions[mstype].map((ms) => (
                                                    <div key={ms.id} className={`relative rounded-md p-3 text-sm/6 transition my-2   ${ms.notCleared && "bg-gray-500/25"} ${ms.active && "bg-gray-200/25  outline outline-2 outline-white/30"}`}>
                                                        <div className="flex flex-row justify-between w-min-full items-center">
                                                            <div className="flex ">

                                                                <li className="flex  flex-col ">
                                                                    <span className="font-semibold text-white">
                                                                        {(ms.notCleared || ms.isClaimed) && <span className="absolute inset-0 bg-gray-900/75 rounded-md" />}
                                                                        {ms.title}
                                                                    </span>
                                                                    <ul aria-hidden="true">
                                                                        <li className=" text-white/50 text-xs mb-3 w-50 text-wrap">{ms.desc} </li>
                                                                        <li className=" text-white/75">{(mstype === "Daily" ? score : clearedLines) > ms.minScore ? ms.minScore : (mstype === "Daily" ? score : clearedLines)}/{ms.minScore} {missionType[mstype]}</li>
                                                                    </ul>
                                                                </li>
                                                            </div>
                                                            <Button disabled={ms.notCleared || ms.isClaimed} onClick={() => claimReward(ms?.minScore, ms.id, mstype)} className={`${ms.active ? "bg-green-500 w-20  hover:bg-green-800" : "bg-gray-700/50 w-20"} text-white rounded-xl flex  flex-col  justify-center items-center`} >
                                                                <ImageNext src="/images/icon.webp" alt="TetrisChain Logo" width={30} height={40} />
                                                                <span className="text-xs">
                                                                    {ms?.rewards} $TRSCHN
                                                                </span>
                                                            </Button>
                                                        </div>
                                                        {
                                                            ms.active && <CheckCircleIcon className="size-6 fill-white  transition " style={{ position: "absolute", top: -2, right: -2 }} />
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </TabPanel>
                                    )}
                                </TabPanels>
                            </TabGroup>

                            <div className="mt-4">

                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => setMission(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >
            <Dialog open={isSetting} as="div" className="relative z-1000 focus:outline-none" style={{ zIndex: 99999 }} onClose={() => setSetting(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center min-w-full p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Settings
                            </DialogTitle>
                            <hr></hr>
                            <Disclosure as="div" className="p-6" >
                                <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                                        Choose Block Type (Non-NFT)
                                    </span>
                                    <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                                    <RadioGroup name="name" value={currBlockType} onChange={(e) => setCurrBlockType(prev => e)} aria-label="Server size" className="space-y-2">
                                        {blockType.map((block) => (
                                            <Radio
                                                key={block.name}
                                                value={block}
                                                className={`group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:not-data-focus:outline-none ${block.name === currBlockType.name && "bg-white/10"} ${block.name === currBlockType.name && "outline"} ${block.name === currBlockType && "outline-white"}`}
                                            >
                                                <div className="flex w-full items-center ">
                                                    <div className="text-sm/6">
                                                        <p className="font-semibold text-white">{block.label}</p>
                                                        <div className="flex gap-2 text-white/50 flex-row items-center justify-between">
                                                            <div>+{(block.point * 100) - 100}% Score </div>
                                                            <div aria-hidden="true">&middot;</div>
                                                            {/* <div>{block.price} $TRSCH</div> */}
                                                            {/* <div aria-hidden="true">&middot;</div> */}

                                                            <motion.div
                                                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-md "
                                                                style={{ backgroundColor: "gray" }}
                                                                animate={{ opacity: [0.6, 1, 0.6] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                <img src={`/images/${block.name}.webp`} className="w-10 h-10 sm:w-11 sm:h-11 rounded-md " style={{ opacity: 0.8 }} />
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                    {
                                                        block.name === currBlockType && <CheckCircleIcon className="size-6 fill-white  transition " style={{ position: "absolute", top: -2, right: -2 }} />
                                                    }

                                                </div>
                                            </Radio>
                                        ))}
                                    </RadioGroup>

                                </DisclosurePanel>
                            </Disclosure>
                            <hr color="gray.900" ></hr>
                            <Disclosure as="div" className="p-6" >
                                <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                                        Choose Block NFT Collection
                                    </span>
                                    <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-sm/5 text-white/50 text-center">
                                    <h4>Coming Soon...</h4>
                                    {/* <RadioGroup value={currBlockType} onChange={(e) => setCurrBlockType(e)} aria-label="Server size" className="space-y-2">
                    {[].map((block) => (
                      <Radio
                        key={block.name}
                        value={block.name}
                        className={`group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:not-data-focus:outline-none ${block.name === currBlockType && "bg-white/10"} ${block.name === currBlockType && "outline"} ${block.name === currBlockType && "outline-white"}`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="text-sm/6">
                            <p className="font-semibold text-white">{block.label}</p>
                            <div className="flex gap-2 text-white/50 flex-row items-center justify-between">
                              <div className="flex gap-2 text-white/50 flex-row items-center">
                                <div>+{block.point} Points</div>
                                <div aria-hidden="true">&middot;</div>
                                <div>{block.price} $TRSCH</div>
                                <div aria-hidden="true">&middot;</div>
                              </div>

                              <motion.div
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-md "
                                style={{ backgroundColor: "gray" }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <img src={`/images/${block.name}.webp`} className="w-10 h-10 sm:w-11 sm:h-11 rounded-md " style={{ opacity: 0.8 }} />
                              </motion.div>
                            </div>
                          </div>
                          {
                            block.name === currBlockType && <CheckCircleIcon className="size-6 fill-white  transition " />
                          }

                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>*/}

                                </DisclosurePanel>
                            </Disclosure>


                            <hr></hr>
                            <div className="mt-4">

                                <Button
                                
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => setSetting(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >



            {
                active === 1 ? (
                    <div class="w-full max-w-md p-4 mb-20 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Top 10 High Score</h5>

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
                                                    99999
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
                        <button onClick={() => setActive(2)} type="button" class={`px-5 py-1.5 text-xs font-medium ${active === 2 ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"} rounded-lg`}>
                            Top Players
                        </button>

                    </div>
                </div>
            </div>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Under Development
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                this feature not avaliable on Beta Testing.
                            </p>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Got it, thanks!
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>


        </div >
    );
};

export default dynamic(() => Promise.resolve(FuturisticTetris), { ssr: false });
