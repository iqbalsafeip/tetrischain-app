'use client'

import { supabase } from '@/utils/supabase';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';

// Client Components:
const Main = dynamic(() => import('../components/main'), { ssr: false })

import React, { useEffect, useMemo, useState } from "react";


export default function main() {
  const route = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState({})


  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const data = await supabase.auth.getUser();

      // setLoading(false)
      console.log(data);
      if (data.error !== null) {
        route.replace("/login")
      } else {
        setLoading(false);
        setUser(()=> data.data?.user?.user_metadata)
      }
    }

    getData()
  }, [])
  if (isLoading) {
    return (
      <div>
        <div id="loading-screen" class=" w-full min-h-[100vh] flex flex-col justify-center items-center  bg-gradient-to-br from-[#0a1624] to-[#0a1624]">
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
      </div>
    )
  }


  return <Main user={user} />
}