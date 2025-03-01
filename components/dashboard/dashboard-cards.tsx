"use client"
import React from 'react';
import { BackgroundGradient } from '../ui/background-gradient';
import Image from 'next/image';
import { Clock,  FileText, MessageCircle } from 'lucide-react';
import { Prisma } from '@prisma/client';
type RecentArticlesProp={
  articles:Prisma.ArticleGetPayload<{
      include:{
          comments:true,
          author:{
              select:{
                  name:true,
                  email:true,
                  imageUrl:true
              }
          }
      }
  }>[];
  totalComments:number
  }



const DashboardCards = ({articles,totalComments}:RecentArticlesProp) => {

   
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2  gap-3  '>
<BackgroundGradient className="rounded-[22px] max-w-full max-sm:max-w-full p-4 sm:p-3 bg-white dark:bg-zinc-900">
        <div className='flex flex-col justify-center gap-2 items-start'>

<Image
  src={`/totalArticle.jpg`}
  alt="jordans"
  height="100"
  width="200"
  className="object-cover w-full h-[130px]   rounded-md"
/>
<div className='flex w-full items-center justify-between   gap-2'>

<p className="text-sm font-bold text-black  dark:text-neutral-200">
 Total Articles
</p>
<FileText size={15}/> 
</div>

<div className='flex items-center  pl-1  justify-between w-full'>
    <h2 className='font-bold'>{articles?.length}</h2>
    <p className='text-gray-600 text-xs'>+5 from last month</p>
</div>
  </div>


</BackgroundGradient>
    <BackgroundGradient className="rounded-[22px] max-sm:max-w-full max-w-full p-4 sm:p-3 bg-white dark:bg-zinc-900">
        <div className='flex flex-col justify-center gap-2 items-start'>

<Image
  src={`/totalComments.jpeg`}
  alt="jordans"
  height="100"
  width="200"
  className="object-cover w-full h-[130px]   rounded-md"
/>
<div className='flex w-full items-center justify-between   gap-2'>

<p className="text-sm font-bold text-black  dark:text-neutral-200">
 Total comments
</p>
<MessageCircle size={15}/> 
</div>

<div className='flex items-center  pl-1  justify-between w-full'>
    <h2 className='font-bold'>{totalComments}</h2>
    <p className='text-gray-600 text-xs'>+5 from last month</p>
</div>
  </div>


</BackgroundGradient>
    <BackgroundGradient className="rounded-[22px] max-sm:max-w-full max-w-full p-4 sm:p-3 bg-white dark:bg-zinc-900">
        <div className='flex flex-col  justify-center gap-2 items-start'>

<Image
  src={`/avg.jpg`}
  alt="jordans"
  height="100"
  width="200"
  className="object-cover  w-full h-[130px]   rounded-md"
/>
<div className='flex w-full items-center justify-between   gap-2'>

<p className="text-sm font-bold text-black  dark:text-neutral-200">
 Avg. Rating Time
</p>
<Clock size={15}/> 
</div>

<div className='flex items-center  pl-1  justify-between w-full'>
    <h2 className='font-bold'>{totalComments}</h2>
    <p className='text-gray-600 text-xs'>+5 from last month</p>
</div>
  </div>


</BackgroundGradient>
    
  

 
    
  
  </div>
  );
}

export default DashboardCards;
