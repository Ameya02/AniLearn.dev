import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/layouts/Container";
import { userSelector } from "@/redux/user/user.selector";

type Props = {};

import { AiOutlineMenu, AiOutlineUser, AiOutlineClose } from "react-icons/ai";

import { isSignedIn, logOut } from "@/utils/Firebase/authentication";

import { userAction } from "@/redux/user/user.action";
import { USER_TYPES } from "@/redux/user/user.types";
import Logo from "@/assets/Icons/Logo";
import { AiFillGithub } from "react-icons/ai";

export default function Navbar({}: Props) {
  const [isUserToggle, setIsUserToggle] = useState<boolean>(false);
  const CURRENT_USER = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    isSignedIn((user: any) => {
      dispatch(userAction(USER_TYPES.user, user));
    });
  });

  return (
    <nav className="absolute top-0 left-0 z-50 w-full px-4 font-medium">
      <Container className="items-center justify-between hidden h-20 md:flex">
        <Link
          href={"/"}
          className="flex items-center gap-1 text-xl font-bold text-slate-700 dark:text-white"
        >
          <Logo size="30" /> niLearn.dev
        </Link>
        <ul className="items-center hidden gap-8 md:flex">
          <a
            href="https://github.com/AliReza1083/AniLearn.dev"
            target={"_blank"}
            className="text-2xl"
          >
            <AiFillGithub />
          </a>
          <Link
            href="/products"
            className="hover:text-slate-700 dark:hover:text-dark-primary"
          >
            Products
          </Link>
          {CURRENT_USER == null ? (
            <Link
              href={"/authentication"}
              className="px-4 py-2 font-bold duration-150 rounded-md text-slate-700 bg-slate-100 dark:bg-[#1ed760] dark:text-black focus:shadow-button"
            >
              Log In / Sign Up
            </Link>
          ) : (
            <div className="relative">
              <div onClick={() => setIsUserToggle(!isUserToggle)}>
                {isUserToggle ? (
                  <Image
                    width={60}
                    height={60}
                    alt=""
                    src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                    className="w-8"
                  />
                ) : (
                  <Image
                    src={
                      CURRENT_USER.photoURL == null
                        ? "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                        : CURRENT_USER.photoURL
                    }
                    width={60}
                    height={60}
                    alt=""
                    className="w-8 rounded-full"
                  />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-primary"></div>
              <AnimatePresence mode="wait">
                {isUserToggle && (
                  <UserToggle
                    currentUser={CURRENT_USER}
                    classNames="absolute right-0 top-16 w-48 rounded-xl"
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </ul>
      </Container>
      <NavbarSmall />
    </nav>
  );
}

type UserToggleTypes = {
  currentUser: any;
  classNames: string;
};

export const UserToggle = ({ currentUser, classNames }: UserToggleTypes) => {
  return (
    <motion.div
      {...userToggleAnimation}
      className={`${classNames} flex flex-col items-center p-2 pt-4 text-center bg-white dark:bg-[#2F3437] dark:border-[#25292c] border-2 shadow-anilearn`}
    >
      <Image
        src={
          currentUser.photoURL == null
            ? "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
            : currentUser.photoURL
        }
        width={200}
        height={200}
        alt=""
        className="w-12 rounded-full"
      />
      <h3>{currentUser.displayName || "User"}</h3>
      <small className="text-xs opacity-70">{currentUser.email}</small>
      <button
        onClick={logOut}
        className="w-full py-1 mt-8 text-white duration-150 bg-red-700 rounded-md focus:shadow-button"
      >
        log out
      </button>
    </motion.div>
  );
};

const userToggleAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.1 },
};

const NavbarSmall = () => {
  const CURRENT_USER = useSelector(userSelector);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <Container className="flex items-center h-20 md:hidden">
      <div
        className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-500 dark:bg-dark-primary dark:text-black"
        onClick={() => setIsNavOpen(true)}
      >
        <AiOutlineMenu />
      </div>
      <div className="flex justify-center grow">
        <Link href={"/"}>
          <Logo size="30" />
        </Link>
      </div>
      <div className="text-xl">
        {CURRENT_USER == null ? (
          <AiOutlineUser />
        ) : (
          <Link href={"/authentication"}>
            <Image
              src={
                CURRENT_USER.photoURL == null
                  ? "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                  : CURRENT_USER.photoURL
              }
              width={60}
              height={60}
              alt=""
              className="w-8 rounded-full"
            />
          </Link>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isNavOpen && (
          <ul className="absolute top-0 left-0 w-full h-screen p-4 isolate">
            <div
              className="absolute top-0 left-0 w-full h-full bg-slate-800/30 -z-10"
              onClick={() => setIsNavOpen(false)}
            ></div>
            <motion.div
              {...userToggleAnimation}
              className="w-full h-auto p-4 bg-white dark:bg-[#2F3437] rounded-xl"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={"/"}
                  className="text-xl font-bold text-slate-700 dark:text-white"
                >
                  AniLearn.dev
                </Link>
                <div
                  className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-500 dark:bg-dark-primary dark:text-black"
                  onClick={() => setIsNavOpen(false)}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className="flex flex-col mt-2 text-lg font-medium">
                <Link href={"/products"} className="py-4">
                  Products
                </Link>
                <a
                  href="https://github.com/AliReza1083/AniLearn.dev"
                  target={"_blank"}
                  className="mb-4 text-2xl"
                >
                  <AiFillGithub />
                </a>
                {CURRENT_USER == null ? (
                  <Link
                    href={"/authentication"}
                    className="px-4 py-2 mt-8 text-base font-bold text-center text-white duration-150 bg-black rounded-md dark:bg-dark-primary dark:text-black focus:shadow-button"
                  >
                    Log In / Sign Up
                  </Link>
                ) : (
                  <small className="self-start px-4 py-1 mt-2 font-bold rounded-md bg-primary/20 text-primary">
                    Signed In
                  </small>
                )}
              </div>
            </motion.div>
          </ul>
        )}
      </AnimatePresence>
    </Container>
  );
};