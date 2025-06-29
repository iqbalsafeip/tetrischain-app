"use client"

import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { LuSend } from 'react-icons/lu';
import { useProgram } from '@/components/hooks/useProgram';
import { supabase } from '@/utils/supabase';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaRankingStar } from 'react-icons/fa6';
import { FcInternal, FcPositiveDynamic } from 'react-icons/fc';



const UnAuthScreen = (props) => {
    const wallet = useWallet()
    const route = useRouter();
    const [loading, setLoading] = useState(true)

    const doLogin = () => {
        setLoading(true)
        supabase.auth.signInWithWeb3({
            chain: 'solana',
            statement: 'I accept the Terms of Service at tetrischain fun',
            wallet,
        }).then((res) => {
            if (!res.error) {
                const session = res.data.session;
                localStorage.setItem("auth", JSON.stringify(session));
                route.replace('/')
            }

            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })


    }

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const data = await supabase.auth.getUser();
            setLoading(false)
            if (!data.error) {
                route.replace("/")
            }
        }
        getData()
    }, [])



    return (
        <>{
            loading && (
                <div id="loading-screen" class="absolute w-[100vw] min-h-[100vh] flex flex-col justify-center items-center  bg-grey-800/75 z-50">
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
            <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1624] to-[#0a1624] text-white ${loading && 'blur-sm'}`}>
                <div className="min-h-screen flex flex-col gap-2 items-center justify-center  text-white text-center" >


                    <Image src="/images/logo.png" alt="TetrisChain Logo" width={200} height={60} className="mx-auto" />
                    <h1 className="text-4xl font-bold text-cyan-400 text-center mt-3">Welcome to Tetris Chain</h1>
                    <p className="text-white/70">Press the button below to begin your journey.</p>

                    <div className='flex flex-row justify-center items-center gap-2' >
                        {wallet.connected ? (
                            <button onClick={() => doLogin()} className=" px-6 py-3 font-semibol bg-gray-800 hover:bg-gray-700 text-white rounded-md min-w-lg flex flex-row justify-between items-center " >
                                <FcInternal  size={24} /> <span className='ms-2'>Sign in with Wallet</span>
                            </button>
                        ) : (
                            <WalletMultiButton />
                        )}
                        <WalletDisconnectButton />
                    </div>


                    <a href={"/leaderboard"} className="px-6 py-3 font-semibol bg-gray-800 hover:bg-gray-700 text-white rounded-md min-w-lg flex flex-row justify-between items-center " >
                        <FcPositiveDynamic size={24} /> <h3 className='ms-2'>Leaderboard</h3>
                    </a>
                </div>

            </div>

        </>
    )
}

export default dynamic(() => Promise.resolve(UnAuthScreen), { ssr: false });
