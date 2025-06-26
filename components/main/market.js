"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaTwitter, FaDiscord, FaGithub, FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause } from "react-icons/fa";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Popover, PopoverButton, PopoverPanel, Description, Dialog, DialogPanel, DialogTitle, Radio, RadioGroup, Disclosure, DisclosureButton, DisclosurePanel, Label, Field } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon, PhoneIcon, PlayCircleIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { LuSettings, LuTimerReset } from "react-icons/lu";
import dynamic from "next/dynamic";
import { useProgram } from "../hooks/useProgram";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import UnAuthScreen from "./UnAuthScreen";  
import audio from "../config/audio";
import useMusic from "../hooks/useMusis";








const blockType = [
    {
        name: "blockWood",
        price: 1000,
        point: 100,
        label: "Wood Block (Lv 1)"
    },
    {
        name: "blockZigzag",
        price: 4000,
        point: 600,
        label: "Zap Block (Lv 2)"
    },
    {
        name: "blockGlow",
        price: 10000,
        point: 1200,
        label: "Glow Block (Lv 3)"
    },
    {
        name: "blockMetal",
        price: 20000,
        point: 2500,
        label: "Block Metal (Lv 4)"
    },
    {
        name: "glow_block",
        price: 50000,
        point: 7000,
        label: "Neon Block (Lv 5)"
    },


]

const Market = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPlay, setPlay] = useState(true);
    const [isPause, setPause] = useState(false);
    const [isSetting, setSetting] = useState(false);
    const [gameOverAlert, setGameOverAlert] = useState(false);
    const [currBlockType, setCurrBlockType] = useState(blockType[0].name);
    const [accountInfo, setAccountInfo] = useState({
        address: "",
        solBalance: ""
    })

    const [volume, setVolume] = useState({
        "Music (BGM)": JSON.parse(localStorage.getItem("Music (BGM)")) ? JSON.parse(localStorage.getItem("Music (BGM)")) : 1,
        "Block Effects": JSON.parse(localStorage.getItem("Block Effects")) ? JSON.parse(localStorage.getItem("Block Effects")) : 1,
        "Sound Effects": JSON.parse(localStorage.getItem("Sound Effects")) ? JSON.parse(localStorage.getItem("Sound Effects")) : 1,
    })

    const [gameState, setGameState] = useState("idle");
    const toAudio = src => {
        const temp = useRef(new Audio(src));
        return temp.current;
    }





    const gamePlay = toAudio(audio.gamePlay);




    useEffect(() => {
        gamePlay.pause()
        gamePlay.volume = volume["Music (BGM)"];
        gamePlay.play()



        localStorage.setItem("Music (BGM)", volume["Music (BGM)"])
    }, [volume])


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


    if (!connected) {
        return (
            <UnAuthScreen />
        );
    }

    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
            <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-50 w-full">
                <div className="flex items-center gap-1">
                    <Image src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
                </div>


                <Popover className=" z-100 md:hidden">
                    <div className="flex flex-row">

                        <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold me-2 ">
                            <span>Menu</span>
                            <ChevronDownIcon aria-hidden="true" className="size-5" />
                        </PopoverButton>
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
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <FaTasks aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" onClick={() => setIsOpen(true)}>
                                            Daily Mission
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">Complete Daily Mission to get rewards</p>
                                    </div>
                                </div>
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <FaWallet aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" onClick={() => setIsOpen(true)}>
                                            Balance
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600 font-semibold">$TRSCHN Balance : 0</p>
                                    </div>
                                </div>
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <ShoppingCartIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" onClick={() => setSetting(true)}>
                                            Market
                                        </a>
                                        <p className="mt-1 text-gray-600 font-semibold">Place where you can buy Non - NFT & NFT Collection Blocks</p>
                                    </div>
                                </div>
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <LuSettings aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a className="font-semibold text-gray-900 text-lg" onClick={() => setSetting(true)}>
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
                                    <RadioGroup value={currBlockType} onChange={(e) => setCurrBlockType(e)} aria-label="Server size" className="space-y-2">
                                        {blockType.map((block) => (
                                            <Radio
                                                key={block.name}
                                                value={block.name}
                                                className={`group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:not-data-focus:outline-none ${block.name === currBlockType && "bg-white/10"} ${block.name === currBlockType && "outline"} ${block.name === currBlockType && "outline-white"}`}
                                            >
                                                <div className="flex w-full items-center ">
                                                    <div className="text-sm/6">
                                                        <p className="font-semibold text-white">{block.label}</p>
                                                        <div className="flex gap-2 text-white/50 flex-row items-center justify-between">
                                                            <div>+{block.point} Points</div>
                                                            <div aria-hidden="true">&middot;</div>
                                                            <div>{block.price} $TRSCH</div>
                                                            <div aria-hidden="true">&middot;</div>

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
                            <Disclosure as="div" className="p-6" >
                                <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                                        Volume
                                    </span>
                                    <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                                    {Object.keys(volume).map((tempVol) => (
                                        <div key={tempVol} >
                                            <label htmlFor="small-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{tempVol}</label>
                                            <input min={0} max={1} step={0.1} id="small-range" type="range" value={volume[tempVol]} onChange={e => setVolume((res) => ({ ...res, [tempVol]: e.target.value, }))} className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"></input>
                                        </div>
                                    ))}
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





        </div >
    );
};

export default Market;
