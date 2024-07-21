"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";




const Nav = () => {

    const isUserLoggedIn = false;
    const [toggleDropdown, setToggleDropdown] = useState(false);


    

  return (
    <nav className="flex-between w-full my-16 pt-3">
         <Link href="/" className="flex gap-2 flex-center">
            <img className="object-contain" src="/assets/images/logo.svg" alt="logo"
                width={30} height={30}
             />
             <p className="logo_text">Course Compass @ CCNY</p>
        </Link> 

        
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Add Course
                    </Link>

                    <button type="button" className="outline_btn">Sign Out</button>
                    <Link href="/profile">
                        <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="profile"></Image>
                    </Link>
                </div>
            ): (
                <>
                    
                    {/* <Link href="/create-account" className="black_btn"> */}
                    <Link href="/schedule" className="black_btn">
                        Join Now
                    </Link>
                </>
            )}
        </div>

        {/* mobile nav */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    {/* <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button> */}
                    <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="profile"
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