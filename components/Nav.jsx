"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import {getAuth} from "firebase/auth"
// import { auth, signOut } from "../backend/config/firebaseAdmin"
// import { useAuthState } from "react-firebase-hooks/auth"



const Nav = () => {

    const user = false;

    // const [user, loading, error] = useAuthState(auth);
    const [toggleDropdown, setToggleDropdown] = useState(false);


    // const handleSignOut = async () => {
    //     try {
    //         await signOut(auth);
    //     } catch (error) {
    //         console.log("error signing out", error)
    //     }
    // }


  return (
    <nav className="flex-between w-full my-12 pt-3">
    {/* // <nav className="fixed top-0 left-0 right-0 border-b px-3 py-2 bg-white z-50"> */}
         <Link href="/" className="flex gap-2 flex-center">
            <img className="object-contain" src="/assets/icons/icon.png" alt="logo"
                width={30} height={30}
             />
             <p className="logo_text">Course Compass @ CCNY</p>
        </Link> 

        
        <div className="sm:flex hidden">
            {user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/schedule" className="black_btn">
                        Add Course
                    </Link>

                    <button type="button" className="outline_btn">Sign Out</button>
                    <Link href="/profile">
                        <Image src="/assets/icons/profile_1.svg" width={37} height={37} className="rounded-full" alt="profile"></Image>
                    </Link>
                </div>
            ): (
                <>
                    
                    {/* <Link href="/create-account" className="black_btn"> */}
                    <Link href="/create-account" className="black_btn">
                        Join Now
                    </Link>
                </>
            )}
        </div>

        {/* mobile nav */}
        <div className="sm:hidden flex relative">
            {user ? (
                <div className="flex">
                    {/* <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button> */}
                    <Image src="/assets/icons/profile_1.svg" width={37} height={37} className="rounded-full" alt="profile"
                            onClick={
                                () => setToggleDropdown((prev) => !prev)
                            }
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            
                            >
                                Add Course
                            </Link>
                            <Link
                                href="/profile" // update href that makes the user sign out
                                className="dropdown_link mt-5 w-full black_btn"
                                onClick={() => setToggleDropdown(false)}
                                
                            
                            >
                                Sign Out
                            </Link>
                        </div>
                    )}
                </div>
            ) : ( //this is when the user is not logged in
                <>
                   <Link href="/create-account" className="black_btn">
                        Join Now
                    </Link>
                </>
            )}
        </div>

        
        
    </nav>
  )
}

export default Nav