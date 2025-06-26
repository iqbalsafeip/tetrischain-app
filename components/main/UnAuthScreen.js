"use client"

import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useProgram } from '../hooks/useProgram';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '@/utils/supabase';
import { LuSend } from 'react-icons/lu';
import { Button } from '../ui/button';



const UnAuthScreen = (props) => {
    const wallet = useWallet()
    const [loading, setLoading] = useState(true)
    const [connect]


   const { balance,
       publicKey,
       connected,
       connection, account } = useProgram();

    const doLogin = () => {
        setLoading(true)
        supabase.auth.signInWithWeb3({
            chain: 'solana',
            statement: 'I accept the Terms of Service at tetrischain fun',
            wallet,
            }).then((res)=> {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        
                                
    }

    useEffect(()=> {
        setLoading(true)
        const getData = async () => {
        const data = await supabase.auth.getUserIdentities();
        
        setLoading(false)
          console.log(data);
          if(!data.error){
          setIsConnect(true)
        }
        }
        
        getData()
      }, [])

    if(loading){
      return (
        <div id="loading-screen" class=" w-full min-h-[100vh] flex flex-col justify-center items-center  bg-dark opacity-75 z-50">
            <div>
                <div class="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
            </div>
            </div>
            <div class="text-xl font-medium text-black ">Loading...</div>
            
        </div>
      )
    }

    return (
      
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1624] to-[#0a1624] text-white'>
                <div className="min-h-screen flex flex-col gap-2 items-center justify-center  text-white text-center" >
                    
                        
                        <Image src="/images/logo.png" alt="TetrisChain Logo" width={200} height={60} className="mx-auto" />
                        <h1 className="text-4xl font-bold text-cyan-400 text-center mt-3">Welcome to Tetris Chain</h1>
                        <p className="text-white/70">Press the button below to begin your journey.</p>



                        {wallet.connected ? (
                           <Button onClick={doLogin} variant="contained" endIcon={<LuSend />}>
                                Sign in with Solana
                            </Button>
                        ) : (
                            <WalletMultiButton />
                        )}
                        <WalletDisconnectButton />
                </div>
            </div>
    )
}

export default UnAuthScreen;