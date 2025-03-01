import React from 'react';
import { BackgroundLines } from '@/components/ui/background-beams';
import { FocusCards } from '@/components/ui/focus-cards';
import Link from 'next/link';
const Hero = () => {

  const cards = [
    {
      title: "Minimalism & Productivity",
      src: "/homeImage1.png",
    },

    
    {
      title: "Morning Routines of CEOs"
,
      src: "/homeImage2.png",
    },
    {
      title: "Mindfulness & Mental Health"
,
      src: "/homeImage3.png",
    },
    
  ];
  return (
    <section className=' relative mt-14  w-full min-h-screen overflow-hidden bg-black flex flex-col'>
      <BackgroundLines >

      {/* gradient overlay */}
      <div className='before:absolute before:left-0 before:top-0 before:h-full before:w-full  before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl'>
      <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32'>


    <div className='flex-1 space-y-8 text-center md:text-left' >
      
        <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>Explore The World Through <span className='bg-gradient-to-br from-[rgb(201,80,125)] to-[#1277ea] bg-clip-text text-transparent'>Words</span></h1>
        <p className=' max-w-2xl text-lg text-gray-300 md:text-xl'>Discover insightful articles, thought-provoking stories, and expert perspectives on technology, lifestyle, and innovations.</p>
        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start'>
     <Link href={"/dashboard"}>
     
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-5 ring-1 ring-white/10 ">
    <span>
      Visit Dashboard
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
     </Link>
     <Link href={"/articles"}>
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-5 ring-1 ring-white/10 ">
    <span>
      Read Articles
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
     </Link>
        </div>
        <div className='grid grid-cols-3 gap-4 lg:pt-2 pt-8 text-white md:max-w-md'>
          <div className='space-y-2'>
            <div className='text-2xl text-white font-bold text-primary'>
              1k+
            </div>
            <div className='text-sm text-gray-400'>
              Published Articles
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-2xl text-white font-bold text-primary'>
              100k+
            </div>
            <div className='text-sm text-gray-400'>
              Expert Writer
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-2xl text-white font-bold text-primary'>
              10m+
            </div>
            <div className='text-sm text-gray-400'>
              Monthly Readers
            </div>
          </div>
        </div>
        <div className='mt-12 flex-1 md:mt-0'>
        <FocusCards cards={cards} />
        {/* <p>hello </p> */}
        </div>
        
    </div>
      </div>
      </div>
        </BackgroundLines>
    </section>
  );
}

export default Hero;
