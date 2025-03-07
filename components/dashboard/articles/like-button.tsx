"use client"
import { toggleLike} from '@/actions/like-dislike';
import { Button } from '@/components/ui/button';
import type { Like } from '@prisma/client';
import { Bookmark,  Share2, ThumbsUp } from 'lucide-react';
import React, { useOptimistic, useTransition } from 'react';

const LikeButton = ({articleId,likes,isLiked}:{articleId:string;likes:Like[];isLiked:boolean}) => {

  const [optimisticLike,setOptimisticLike]=useOptimistic(likes.length)
  const [isPending,startTransition]=useTransition();

  const handleLikeDislike=async()=>{
    startTransition(async()=>{
      setOptimisticLike(isLiked ? optimisticLike-1 : optimisticLike + 1);
      await toggleLike(articleId);
    })
  }
  return (
    <div className='flex gap-4 mb-12 border-t pt-8'>
      <form action={handleLikeDislike}>
        <Button disabled={isPending} type='submit' variant={"ghost"}><ThumbsUp className={`h-5 gap-2 w-5 ${isLiked && "fill-red-500"}`}/> {optimisticLike}
        </Button>
        <Button variant={"ghost"}>
            <Bookmark className='h-5 gap-2 w-5'/>
            
        </Button >
        <Button variant={"ghost"}>
            <Share2 className='h-5 gap-2 w-5'/>

        </Button>
      </form>
    </div>
  );
}

export default LikeButton;
