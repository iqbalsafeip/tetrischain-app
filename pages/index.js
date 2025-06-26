'use client'

import dynamic from 'next/dynamic'

// Client Components:
const Main = dynamic(() => import('../components/main'), { ssr: false })

import React, { useEffect, useMemo } from "react";


export default function main() {


  return (
    <div>

      <Main />

    </div>
  )
}