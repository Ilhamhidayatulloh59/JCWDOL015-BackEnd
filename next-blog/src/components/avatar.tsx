'use client'

import { deleteToken, getToken } from "@/lib/server"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AvatarComp() {
    const [token, setToken] = useState('')
    const getData = async () => {
        const res = await getToken()
        setToken(res || '')
    }

    const onLogout = async () => {
        await deleteToken()
        setToken('')
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {
                token ? 
                <div onClick={onLogout} className="cursor-pointer">Log Out</div> 
                    :
                <div className="flex gap-4">
                    <Link href={'/register'}>Register</Link>
                    <Link href={'/login'}>Login</Link>
                </div> 
        }
        </div>
    )
}