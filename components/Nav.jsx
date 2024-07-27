"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
    const [user, setUser] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    }, []);

    const handleSignOut = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        // Add any additional sign-out logic here
        router.push('/');
        
    };

    return (
        <nav className="flex-between w-full my-12 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <img className="object-contain" src="/assets/icons/icon.png" alt="logo" width={30} height={30} />
                <p className="logo_text">Course Compass @ CCNY</p>
            </Link> 

            <div className="sm:flex hidden">
                {user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/schedule" className="black_btn">
                            Add Course
                        </Link>
                        <button type="button" className="outline_btn" onClick={handleSignOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src="/assets/icons/profile_1.svg" width={37} height={37} className="rounded-full" alt="profile" />
                        </Link>
                    </div>
                ) : (
                    <Link href="/create-account" className="black_btn">
                        Join Now
                    </Link>
                )}
            </div>

            {/* Mobile nav */}
            <div className="sm:hidden flex relative">
                {user ? (
                    <div className="flex">
                        <Image src="/assets/icons/profile_1.svg" width={37} height={37} className="rounded-full" alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/schedule" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                    Add Course
                                </Link>
                                <button className="dropdown_link mt-5 w-full black_btn" onClick={() => { setToggleDropdown(false); handleSignOut(); }}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/create-account" className="black_btn">
                        Join Now
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
