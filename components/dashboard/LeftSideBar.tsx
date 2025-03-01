import React from 'react';
import { ToggleMode } from '../home/header/ToggleMode';
import {
    Sheet,
    
    SheetContent,
    SheetDescription,
    
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '../ui/button';
import {  FileText, Home, LayoutDashboard,  PlusIcon, Settings } from 'lucide-react';
import Link from 'next/link';

const LeftSideBar = () => {
  return (
    <div className='md:sticky max-md:fixed max-md:z-50   top-0 left-0'>
      <Sheet>
  <SheetTrigger asChild>

    <Button variant={"outline"} className='md:hidden rounded-full  m-2'><LayoutDashboard className='mr-2' />SideBar</Button>
    
    </SheetTrigger>
  <SheetContent className='text-white'>
    <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
       
      </SheetDescription>
    </SheetHeader>
    <DashBoardSideBar/>
  </SheetContent>
</Sheet>


<div className='hidden    md:block h-screen w-[230px] border-r-2 dark:border-zinc-50 bg-background'>
  <DashBoardSideBar/>
</div>
    </div>
  );
}

export default LeftSideBar;


const DashBoardSideBar = () => {
    return ( 
            <div className='h-full px-4 py-6'>
                    <div className='flex items-center  gap-2 mb-8 px-1'>
                        <Link href={"/"}><h1 className="text-2xl font-bold bg-gradient-to-br from-[#8732a5] to-[#0c6fa1] bg-clip-text text-transparent drop-shadow-md">
        NextBlog
      </h1></Link>
        <div className='flex flex-col text-xs text-red-500 font-bold items-center'>
          Try Dark <ToggleMode/>
        </div>
                    </div>

                    <nav className='flex flex-col space-y-1 '>
                      <Link className='w-full' href={"/"}><Button className='w-full justify-start' variant={"ghost"}><Home/>Home</Button></Link>
                      <Link className='w-full' href={"/dashboard"}><Button className='w-full justify-start' variant={"ghost"}><LayoutDashboard/>Overview</Button></Link>
                      <Link className='w-full' href={"/dashboard/articles/create"}><Button className='w-full justify-start' variant={"ghost"}><PlusIcon size={19} />Add Articles</Button></Link>
                      <Link className='w-full' href={"/articles"}><Button className='w-full justify-start' variant={"ghost"}><FileText/>View All Articles</Button></Link>
                      {/* <Link className='w-full' href={"/dashboard"}><Button className='w-full justify-start' variant={"ghost"}><MessageCircle/>Comments</Button></Link>
                      <Link className='w-full' href={"/dashboard"}><Button className='w-full justify-start' variant={"ghost"}><BarChart/>Analytics</Button></Link> */}
                      <Link className='w-full' href={"/dashboard"}><Button className='w-full justify-start' variant={"ghost"}><Settings/>Settings</Button></Link>
                    </nav>
            </div>
    )
}