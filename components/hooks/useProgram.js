"use client";


import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";

import { useEffect, useState } from "react";


/**
 * A hook that provides access to the Solana program, counter address,
 * connected wallet, and connection.
 * This hook handles the basic setup for the program.
 */
export function useProgram() {
    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const [balance, setBalance] = useState(null);
    const [account, setAccount] = useState(null);

    // Program initialization - conditionally create with provider if wallet connected

    // Get the counter account address


    // Fund connected wallet with devnet SOL
    

    return {
        balance,
        publicKey,
        connected,
        connection,
        wallet,
        account
    };
}
