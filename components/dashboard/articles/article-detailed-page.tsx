import React from 'react';
import type {  Prisma } from '@prisma/client';
// import { GridItem } from '@/components/ui/glowing-effect-demo';
// import { Box } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LikeButton from './like-button';
import CommentList from './comment-list';
import CommentInuput from './comment-input';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';


type Props = {
    article:Prisma.ArticleGetPayload<{include:{author:{select:{name:true,email:true,imageUrl:true}}}}>;
}
const ArticleDetailedPage = async(
    {article}:Props
) => {

   
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto py-12  px-4 sm:px-6 lg:px-8'>
        <article className='mx-auto max-w-3xl'>
        <GridItem
        
        avatar={<Avatar>
            <AvatarImage src={article.author.imageUrl as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          }
        title={article.title}
        description={article.content.replace(/<[^>]+>/g, '')}
        image={article.featuredImage as string}
        authorName={article.author.name}
        createdAt={article.createdAt.toDateString()}
        articleId={article.id}
        />
        </article>
      </main>
    </div>
  );
}

export default ArticleDetailedPage;


interface GridItemProps {
  
    avatar: React.ReactNode;
    title: string;
    description: React.ReactNode;
    image?: string;
    authorName?:string;
    createdAt?:string
    articleId?:string
  }
  

 const GridItem = async({  avatar, title, description,image,authorName,createdAt,articleId }: GridItemProps) => {
    const comments=await prisma.comment.findMany({
        where:{
            articleId:articleId
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true,
                }
            }
        }
    })
    const likes=await prisma.like.findMany({
        where:{articleId:articleId}
    });
    const {userId}=await auth();
    const user=await prisma.user.findUnique({
        where:{
            clerkUserId:userId as string,
        }
    });
    const isLiked:boolean=(await likes).some((like)=> like.userId === user?.id)
    return (
      <li className={`min-h-[14rem] list-none `}>
        <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
          
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className='flex justify-between items-center'>

              <div className="w-fit rounded-lg border  p-2 ">
                {avatar}
              </div>
              <div className='flex justify-center items-center flex-col'>
                <h2 className='font-bold '>{authorName}</h2>
                <p className='text-xs text-gray-300'>{createdAt}</p>
              </div>
                </div>
              {
                image && (
  
                    <div className="w-full h-[350px] overflow-hidden rounded-md">
                    <Image
                      className="w-full h-full object-cover"
                      width={200}
                      height={350}
                      src={image as string}
                      alt="jordans"
                    />
                  </div>
                )
              }
              
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                  {title}
                </h3>
                <h2
                  className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem] tracking-wide text-black dark:text-neutral-400"
                >
                  {description}
                </h2>
              </div>
              

            </div>
            
            {/* Article action button  */}

            <LikeButton isLiked={isLiked} likes={likes } articleId={articleId as string}/>
            <CommentInuput articleId={articleId as string}/>
            {/* comment action section  */}

            <CommentList comments={comments}/>
          </div>
        </div>
      </li>
    );
  };
  
