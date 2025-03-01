"use client"
import { createComment } from '@/actions/create-comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useActionState } from 'react';

const CommentInuput = ({articleId}:{articleId:string}) => {

    const [formState,action,isPending]=useActionState(createComment.bind(null,articleId),{errors:{}})
  return (
    <div>
        <form action={action} className='mb-8'>
            <div className='flex gap-4'>
                <Avatar>
                    <AvatarImage src=""></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-1 '>

            <Input type="text" name='body' placeholder='Add a comment'/>
                {
                    formState.errors.body && <p className='text-red-500 text-sm'>{formState.errors.body}</p>
                }
                {
                    formState.errors.formErrors && <p className='text-red-500 text-sm'>{formState.errors.formErrors}</p>
                }
                <div className='mt-4 flex justify-end'>
                <Button disabled={isPending} type='submit'>{isPending ? "Posting..":"Post Comment"}</Button>
                </div>
                </div>
            </div>
        </form>
    </div>
  );
}

export default CommentInuput;
