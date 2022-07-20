import React from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRecoilState } from "recoil";
import {
  HiUserGroup,
  HiOutlinePaperAirplane,
  HiMenu,
  HiHome,
} from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative cursor-pointer hidden md:inline-grid w-24 "
        >
          <Image
            src="https://res.cloudinary.com/dplljbrim/image/upload/v1658082960/project%20photos/Instagram_logo.svg_uzhykr.png"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative cursor-pointer  md:hidden w-10  flex-shrink-0"
        >
          <Image
            src="https://res.cloudinary.com/dplljbrim/image/upload/v1658083911/project%20photos/87390_rcojgh.png"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        {/* Middle */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <BsSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center text-center justify-end space-x-4">
          <HiHome className="navbtn" onClick={() => router.push("/")} />

          {session ? (
            <>
              <div className="relative navbtn">
                <HiOutlinePaperAirplane className="navbtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>

              <AiOutlinePlusCircle
                onClick={() => setOpen(true)}
                className=" h-12 w-14 md:h-7 md:w-5 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
              />
              <HiUserGroup className="navbtn" />
              <img
                src={session?.user?.image}
                alt="user-avatar"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={signOut}
              />
            </>
          ) : (
            <>
              <button
                className="text-sm
              "
                onClick={signIn}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
