"use client";
import React, { useState, useEffect, useRef, Children } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleDown, FaRedo, FaAngleDoubleDown, FaTasks, FaWallet, FaAddressCard, FaPlayCircle, FaPause, FaHandHoldingUsd } from "react-icons/fa";
import ImageNext from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Popover, PopoverButton, PopoverPanel, Dialog, DialogPanel, DialogTitle, Radio, RadioGroup, Disclosure, DisclosureButton, DisclosurePanel, Label, Field, TabGroup, TabList, Tab, TabPanels, TabPanel, Fieldset, Legend, Input, Description } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { LuPersonStanding, LuSettings, LuTimerReset, LuWallet } from "react-icons/lu";
import { FaRankingStar } from "react-icons/fa6";
import { useProgram } from "../hooks/useProgram";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FcAddressBook, FcButtingIn, FcCurrencyExchange, FcPositiveDynamic, FcReuse, FcShop, FcSurvey } from "react-icons/fc";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase";
import { avatars, blockType, categories, missionType } from "@/utils/constant";
import { displayWallet, formatDateComparable, formatShortNumber } from "@/utils/general";
import { useRouter } from "next/navigation";


const Header = ({ user, children, setPlay, started, setPause, isPause = false, setGameOverAlert, restartGame, isPlay = false, currBlockType, setCurrBlockType, gameOverAlert = false }) => {

    const [score, setScore] = useState(() => 0);
    const [clearedLines, setClearedLines] = useState(() => 0);
    const [myBalance, setBalance] = useState(0);
    const [selected, setSelected] = useState(0);
    // const [isPause, setPause] = useState(false)
    // const [started, setStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isSetting, setSetting] = useState(false);
    // const [gameOverAlert, setGameOverAlert] = useState(false);
    const [isMission, setMission] = useState(false)
    const [accountInfo, setAccountInfo] = useState({
        address: "",
        solBalance: ""
    })

    const [uname, setUname] = useState("")

    const [listMissions, setListMission] = useState(() => categories)

    const [missionActive, setMissionActive] = useState("Daily")


    const [loading, setLoading] = useState(false)

    const claimReward = async (minScore, id, mstype) => {
        try {
            setLoading(true);
            const _user = await supabase.auth.getUser();
            
            const curscore = user?.todayHighscore || 0;
            const balance = user?.balance || 0
            if (curscore < minScore) return false;
    
            const tempMission = listMissions[mstype][id - 1];
    
            await supabase.auth.updateUser({
                data: { balance: balance + tempMission.rewards }
            });

            let res= await supabase.from('earn_transaction').upsert({
                player: _user.data.user.id,
                amount: tempMission.rewards,
                date: formatDateComparable(Date.now()),
                source: tempMission
            })

            console.log(res);
            
            
    
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
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.log(error);
            
        }

    }

    const [isConnect, setIsConnect] = useState(false)

    const route = useRouter()
    const doLogout = () => {
        setLoading(true)
        supabase.auth.signOut().then(res => {
            setIsConnect(false)
            setLoading(false)
            console.log(res);
            route.replace('/')
        }).catch(err => {

            setLoading(false)
        })
        setLoading(false)
    }

    const updateProfile = () => {
        if (selected !== 0 || uname !== "") {
            setLoading(true);
            supabase.auth.updateUser({
                data: {
                    avatar: selected,
                    username: uname
                }
            }).then((res) => {
                setLoading(false)
                console.log(res);

            }).catch(err => {
                setLoading(false)
                console.log(err);
            })
        }
    }

    useEffect(()=> {
        const getData = async () => {
            const now = formatDateComparable(Date.now());
            const _user = await supabase.auth.getUser();
            const data = await supabase.from('earn_transaction').select("").eq("player", _user.data.user.id).eq("date", now);
            console.log(data);
            
        }
        getData();
    }, [])


    return (
        <>
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
            <div className="relative  text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624]">

                <div className={`relative min-h-[100vh] min-w-[100vw] text-white flex flex-col items-center justify-start p-1 sm:p-2 bg-gradient-to-br from-[#0a1624] to-[#0a1624] ${loading && "blur-md"}`}>
                    <div className="top-1 left-4 right-4 flex flex-row  justify-between items-center px-1 z-1 w-full">
                        <div className="flex items-center gap-1">
                            <ImageNext src="/images/logo.png" alt="TetrisChain Logo" width={80} height={20} />
                        </div>

                        <Popover className=" z-10">
                            <div className="flex flex-row">

                                <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold me-2 ">
                                    <span>Menu</span>
                                    <ChevronDownIcon aria-hidden="true" className="size-5" />
                                </PopoverButton>
                                <Button className="bg-green-600 hover:bg-cyan-800 text-white rounded-xl flex flex-row justify-center align-center me-2" onClick={() => setPlay(true)}>
                                    {started ? <LuTimerReset size={18} /> : <FaPlayCircle size={18} />}
                                </Button>
                                <Button className="bg-orange-600 hover:bg-orange-800 text-white rounded-xl flex flex-row justify-center align-center me-2" onClick={() => setPause(e => !isPause)}>
                                    {isPause ? <FaPlayCircle size={18} /> : <FaPause size={18} />}
                                </Button>
                                <a href={"/leaderboard"} className=" px-4 py-2 font-semibol bg-gray-800 hover:bg-gray-600 text-white rounded-xl flex flex-row justify-center align-center me-2" >
                                    <FcPositiveDynamic size={18} />
                                </a>
                                <a href={"/market"} className=" px-4 py-2 font-semibol bg-cyan-600 hover:bg-cyan-800 text-white rounded-xl flex flex-row justify-center align-center" >
                                    <FcShop size={18} />
                                </a>
                            </div>
                            <PopoverPanel
                                transition
                                className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                                <div className="w-screen max-w-md flex-auto md:overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <FcAddressBook aria-hidden="true" className="size-10 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                                <div class="shrink-0 group block">
                                                    <div class="flex items-center">
                                                        <img class="inline-block shrink-0 w-[64px] rounded-full" src={user.avatar ? `images/avatar/avatar_${user.avatar}.webp` : `images/logo.png`} alt="Avatar" />
                                                        <div class="ms-3">
                                                            <h3 class="font-semibold text-lg text-gray-800">{user?.username || displayWallet(user.custom_claims.address)}</h3>
                                                            <p class="text-sm font-light text-gray-400">{displayWallet(user.custom_claims.address)}</p>
                                                            <p class="text-md font-medium text-gray-800">Highcore : {user.highScore || 0}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <FcSurvey aria-hidden="true" className="size-10 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                                <a className="font-semibold text-gray-900 text-lg" onClick={() => setMission(true)}>
                                                    Daily Mission
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">Complete Daily Mission to get rewards</p>
                                            </div>
                                        </div>
                                        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <FcCurrencyExchange aria-hidden="true" className="size-10 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                                <a className="font-semibold text-gray-900 text-lg" >
                                                    Balance
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600 font-semibold">$TRSCHN Balance : {user.balance}</p>
                                            </div>
                                        </div>
                                        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center" onClick={() => setIsOpen(true)}>
                                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <FcButtingIn aria-hidden="true" className="size-10 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                                <a className="font-semibold text-gray-900 text-lg" >
                                                    Profile
                                                </a>
                                                <p className="mt-1 text-gray-600 font-semibold">Edit your profile for identiy </p>
                                            </div>
                                        </div>
                                        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 align-center" onClick={() => doLogout()}>
                                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <FcReuse aria-hidden="true" className="size-10 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                                <a className="font-semibold text-gray-900 text-lg" >
                                                    Logout
                                                </a>
                                                <p className="mt-1 text-gray-600 font-semibold">logout tetrischain do anoter stuff!</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </PopoverPanel>
                        </Popover>

                    </div>
                    <Dialog open={isPlay} as="div" className="relative z-1000 focus:outline-none" onClose={() => setPlay(false)}>
                        <div className="fixed inset-0 z-1000 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                                >
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                        Ready To Play Tetris Chain ?
                                    </DialogTitle>
                                    <p className="mt-2 text-sm/6 text-white/50">
                                        You are now on Tetris Chain Game, let's Play and Earn!
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                                            onClick={restartGame}
                                        >
                                            Play Now !
                                        </Button>
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                            onClick={() => setPlay(false)}
                                        >
                                            Later
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
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
                                                                                <li className=" text-white/75">{(mstype === "Daily" ? score : clearedLines) > ms.minScore ? ms.minScore : (mstype === "Daily" ? (user.todayHighscore || 0) : clearedLines)}/{ms.minScore} {missionType[mstype]}</li>
                                                                            </ul>
                                                                        </li>
                                                                    </div>
                                                                    <Button disabled={loading} onClick={() => claimReward(ms?.minScore, ms.id, mstype)} className={`${ms.active ? "bg-green-500 w-20  hover:bg-green-800" : "bg-gray-700/50 w-20"} text-white rounded-xl flex  flex-col  justify-center items-center`} >
                                                                        <ImageNext src="/images/icon.webp" alt="TetrisChain Logo" width={30} height={40} />
                                                                        <span className="text-xs">
                                                                            {formatShortNumber(ms?.rewards)} $TRSCHN
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

                            </div>
                        </div>
                    </Dialog >
                    <Dialog open={isPause} as="div" className="relative z-10 focus:outline-none" onClose={() => setPause(false)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                                >
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                        Game Paused
                                    </DialogTitle>
                                    <p className="mt-2 text-sm/6 text-white/50">
                                        The game will not continue until you close the prompt
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                                            onClick={() => setPause(false)}
                                        >
                                            Continue
                                        </Button>

                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog open={gameOverAlert} as="div" className="relative z-10 focus:outline-none" onClose={() => setGameOverAlert(false)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                                >
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-red-900">
                                        Game Over
                                    </DialogTitle>
                                    <p className="mt-2 text-sm/6 text-white/50">
                                        The Blocks All Over !!
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 me-2"
                                            onClick={restartGame}
                                        >
                                            Play Again ?
                                        </Button>
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                            onClick={() => setGameOverAlert(false)}
                                        >
                                            Later
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none mt-20" onClose={() => setIsOpen(false)}>
                        <div className="fixed inset-0 z-50 w-screen overflow-y-auto mt-20">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                                >
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                        Profile Details
                                    </DialogTitle>
                                    <div className="w-full max-w-lg px-4 mt-5">
                                        <Fieldset className=" ">
                                            <Field>
                                                <Label className="text-sm/6 font-medium text-white">Avatar</Label>
                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4" >
                                                    {
                                                        avatars.map(e => (
                                                            <div class="relative inline-block" onClick={_ => setSelected(e.id)}>
                                                                <img class={`inline-block  rounded-full size-sm  ${e.id === selected ? "brightness-200" : ""}`} src={`images/avatar/${e.filename}`} alt="Avatar" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                {/* <Input
                                                    className={
                                                        'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                    }
                                                /> */}
                                            </Field>
                                            <Field>
                                                <Label className="text-sm/6 font-medium text-white">Username</Label>
                                                <Input
                                                    onChange={e => setUname(e.target.value)}
                                                    className={
                                                        'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                    }
                                                />
                                            </Field>
                                            <Field>
                                                <Label className="text-sm/6 font-medium text-white">Wallet Address</Label>
                                                <Input
                                                    disabled
                                                    value={displayWallet(user.custom_claims.address)}
                                                    className={
                                                        'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                    }
                                                />
                                            </Field>

                                        </Fieldset>

                                        <hr />
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
                                                            key={block?.name}
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


                                            </DisclosurePanel>
                                        </Disclosure>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="inline-flex items-center self-end rounded-md bg-indigo-800 hover:bg-indigo-900  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                            onClick={updateProfile}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    {children}
                </div>
            </div>
        </>

    );
};


export default dynamic(() => Promise.resolve(Header), { ssr: false, loading: () => <p>...</p> });

