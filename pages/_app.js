'use client'

import '@/styles/globals.css'
import '@/public/App.css'; // Add necessary styles here




// Client Components:

import React, { useEffect, useMemo } from "react";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useProgram } from '@/components/hooks/useProgram';
import { createDefaultAddressSelector, createDefaultAuthorizationResultCache, createDefaultWalletNotFoundHandler, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { SolflareWalletAdapter, } from '@solana/wallet-adapter-solflare';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { MagicEdenWalletAdapter } from '@solana/wallet-adapter-magiceden';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { MathWalletAdapter } from '@solana/wallet-adapter-mathwallet';
import { TokenPocketWalletAdapter } from '@solana/wallet-adapter-tokenpocket';
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
require("@headlessui/tailwindcss")
require("./loading.css")

export default function main({ Component, pageProps }) {
  const endpoint = useMemo(() => "https://fluent-rough-resonance.solana-mainnet.quiknode.pro/e2254e5f4a4cf5b4b6d4c25763573fa58bc63782/");

  const wallets = useMemo(() => [
    new SolflareWalletAdapter(),
    new PhantomWalletAdapter(),
    new TrustWalletAdapter(),
    new MagicEdenWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new MathWalletAdapter(),
    new TokenPocketWalletAdapter()
  ], [endpoint]);


  return (
    <div>
      <ConnectionProvider  endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}
