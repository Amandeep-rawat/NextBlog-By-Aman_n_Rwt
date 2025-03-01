
import React from 'react';
import { FollowerPointerCard } from '../ui/following-pointer';
import Image from 'next/image';
import TitleComponent from '../ui/title-component';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const TopArticles = async() => {
  const articles = await prisma.article.findMany({
    take: 3, // Limit to 5 latest articles
    orderBy: {
      createdAt: "desc", // Sort by latest first
    },
    include: {
      comments: true, // Include related comments
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  

  
    // const blogContent = {
    //     slug: "amazing-tailwindcss-grid-layouts",
    //     author: "Manu Arora",
    //     date: "28th March, 2023",
    //     title: "Amazing Tailwindcss Grid Layout Examples",
    //     description:
    //       "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    //     image: "/homeImage2.png",
    //     authorAvatar: "/manu.png",
    //   };
  return (
    <div className='grid gap-8  sm:grid-cols-2 lg:grid-cols-3'>
    {
      articles.map((article)=>{
        return (
          <div key={article.id}>
            
            <FollowerPointerCard

    title={
      <TitleComponent
      title={article.author.name}
      avatar={article.author.imageUrl as string}
      />
    }
  >
    <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-gradient-to-br from-[#3f3fbd] to-[#8f078d]   hover:shadow-xl border-2 border-purple-400 dark:border-zinc-100">
      <div className="w-full aspect-w-16 aspect-h-10 mx-auto bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
        <Image
          src={article.featuredImage}
          alt="thumbnail"
           width={250}
           height={250}
        //   layout="fill"
          objectFit="cover"
          className={`group-hover:scale-95 w-full h-[210px]  group-hover:rounded-2xl transform object-cover transition duration-200 `}
        />
      </div>
      <div className=" p-4">
        <h2 className="font-bold h-16 overflow-hidden my-1 text-lg text-white ">
          {article.title.slice(0,40)}...
        </h2>
        <h2 className="font-normal my-1 text-sm h-16 overflow-hidden text-zinc-300 ">
          {article.content.replace(/<[^>]*>?/gm, "").slice(0,90)}
        </h2>
        <div className="flex flex-row justify-between items-center mt-4">
          <span className="text-sm text-gray-300 ">{article.createdAt.toDateString()}</span>
      
             <Link href={`/articles/${article.id}`}>
          <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
            
             <p>read more</p>
             
            
          </div>
             </Link> 
        </div>
      </div>
    </div>
          </FollowerPointerCard>
  
          </div>

        )
      })
    }
    
      
     
    </div>
  );
}

export default TopArticles;


