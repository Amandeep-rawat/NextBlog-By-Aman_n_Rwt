"use client";
import React, { ReactNode }  from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import SearchInput from "../home/header/SearchInput";
import { ToggleMode } from "../home/header/ToggleMode";
import { FileText, Info, LayoutDashboard, MenuIcon } from "lucide-react";
// import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, SignedOut,  SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./button";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer font-semibold  hover:opacity-[0.9] "
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)]  left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className=" backdrop-blur-sm rounded-2xl bg-white  overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative  border-b dark:bg-[#09090B] bg-white   border-transparent dark:border-gray-700  shadow-input flex justify-between items-center px-8 max-[900px]:px-4 py-3 "
    >
      
      <h1 className="text-2xl flex font-bold bg-gradient-to-br from-[#8732a5] to-[#0c6fa1] bg-clip-text text-transparent drop-shadow-md">
        NextBlog <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ca91df] to-[#0c6fa1] pt-2 mt-2 text-[11px]">By Rwt</span>
      </h1>


      <div className="flex items-center max-md:hidden space-x-3">
        {children}

      </div>
      <SearchInput className="w-56 pl-10" wrapperClassName="max-[551px]:hidden" />
      <div className="flex items-center ">


        <div className="flex items-center gap-x-3 ">
          <ToggleMode />
          {/* user action */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>

            <div className="hidden md:flex items-center gap-x-3">


              <SignInButton>

                <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 max-[900px]:px-3 max-[900px]:text-xs max-[900px]:h-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  Login
                </button>
              </SignInButton>
              <SignInButton>
                <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 max-[900px]:px-3 max-[900px]:text-xs max-[900px]:h-8 focus:ring-offset-slate-50 ">

                  Signup
                </button>

              </SignInButton>


            </div>
          </SignedOut>
          <div className="md:hidden flex items-center" >
            <Sheet>
              <SheetTrigger><MenuIcon size={25} /></SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <h1 className="text-2xl w-fit flex font-bold bg-gradient-to-br from-[#8732a5] to-[#0c6fa1] bg-clip-text text-transparent drop-shadow-md">
        NextBlog <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ca91df] to-[#0c6fa1] pt-2 mt-2 text-[11px]">By Rwt</span>
      </h1>     </SheetTitle>
                  <SheetDescription>

                  </SheetDescription>

                </SheetHeader>
                <div className="flex flex-col gap-y-5">

                  <SearchInput className="w-full text-white pl-10 " />
                  <div className="w-full flex font-semibold text-white flex-col gap-3">
                    <Link className='w-full' href={"/dashboard"}><Button className='w-full justify-start' variant={"ghost"}><LayoutDashboard />Dashboard</Button></Link>
                    <Link className='w-full' href={"/about"}><Button className='w-full justify-start' variant={"ghost"}><Info />About</Button></Link>
                    <Link className='w-full' href={"/articles"}><Button className='w-full justify-start' variant={"ghost"}><FileText />Articles</Button></Link>
                  </div>

                  <div className="flex flex-col items-center gap-y-3">

                  <SignedOut>

              <SignInButton>

                    <button className="inline-flex h-10 w-full animate-shimmer  items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      Login
                    </button>
              </SignInButton>

              <SignInButton>


                    <button className="inline-flex w-full h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">

                      Signup
                    </button>
              </SignInButton>
                  </SignedOut>



                  </div>

                </div>
              </SheetContent>
            </Sheet>


          </div>


          
        </div>
      </div>

    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl text-neutral-500 font-bold mb-1 ">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] ">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700  hover:text-black "
    >
      {children}
    </Link>
  );
};
