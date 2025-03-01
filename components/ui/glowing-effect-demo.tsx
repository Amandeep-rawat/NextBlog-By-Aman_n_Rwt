"use client";

// import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";
import type {  Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";


type GlowingEffectProps = {
  articles: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          imageUrl: true;
        };
      };
     
    };
  }>[];
};

export function GlowingEffectDemo({articles}:GlowingEffectProps) {
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 max-sm:gap-5 gap-3'>
    
    {
      articles.map((article)=><Link className="" key={article.id} href={`/articles/${article.id}`}><GridItem 
        
      
      title={article.title}
      description={article.content.replace(/<[^>]*>?/gm, "").slice(0,40)}
      image={article.featuredImage}
      category={article.category}
      avatar={article.author.imageUrl!}
      authorName={article.author.name}
      createdAt={article.createdAt.toDateString()}
      /></Link>)
    }
      
      </div>
    
      

      
    

  );
}

interface GridItemProps {
  
  
  title: string;
  description: React.ReactNode;
  image?: string;
  category?:string;
  authorName?:string;
  avatar?:string;
  createdAt?:string
}

export const GridItem = ({category,avatar,authorName ,title, description,image,createdAt }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] max-sm:w-[90%] max-sm:mx-auto list-none `}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect className="hidden md:block"
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          
          <div className="relative flex flex-1 flex-col justify-between gap-3">
          
            {
              image && (

          <div>
                <Image className="w-full rounded-lg object-cover  h-[200px]" width={200} height={200}  src={image as string} alt="jordans"/>
            </div>
              )
            }
            <div className="flex items-center justify-between">
            <Avatar className="w-6 h-6">
              <AvatarImage  src={avatar}/>
      <AvatarFallback className="text-sm">CN</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-[#f5b9b9] to-[#f70cac] text-sm text-gray-300"> <span className="">{authorName}</span></h2>
          </div>
            
            <div className="">
            <h3 className="pt-0.5 text-lg/[1.375rem] font-semibold font-sans overflow-hidden -tracking-4 md:text-lg/[1.875rem] text-balance text-black dark:text-white h-16">
  {title.slice(0,30)}...
</h3>
<h2 className="text-sm md:text-sm/[1.375rem] text-black dark:text-neutral-400 h-14 overflow-hidden">
  {description} ..............
</h2>
                <div className="flex items-center justify-between">

              <p className="text-xs text-gray-400">
                Category: <span className="font-bold"> {category}</span>
              </p>
                <p className="text-xs font-semibold text-gray-400">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
