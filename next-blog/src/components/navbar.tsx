import Link from "next/link"
import Wrapper from "./wrapper"
import { getToken } from "@/lib/server"

export const Navbar = async () => {
    const token = await getToken()
    return (
        <div className="sticky top-0 h-[80px]">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <Wrapper>
                    <div className="flex justify-between w-full items-center">
                        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://www.blogger.com/img/logo_blogger_40px_2x.png" className="h-8" alt="Blog Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogger</span>
                        </Link>
                        {
                            token ? 
                            <div>Log Out</div> 
                                :
                            <div className="flex gap-4">
                                <Link href={'/register'}>Register</Link>
                                <Link href={'/login'}>Login</Link>
                            </div>   
                        }
                    </div>
                </Wrapper>
            </nav>
        </div>
    )
}