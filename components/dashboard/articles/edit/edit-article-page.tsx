"use client"
import dynamic from 'next/dynamic';
// import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Meteors } from '@/components/ui/meteors';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill=dynamic(() => import('react-quill-new'), {ssr: false})
import { FormEvent, startTransition, useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
// import { createArticle } from '@/actions/create-article';
import { Loader2 } from 'lucide-react';
import type { Article } from '@prisma/client';
import Image from 'next/image';
import { editArticle } from '@/actions/edit-article';

const EditArticlePage = ({article}:{article:Article}) => {

    const [content,setContent]=useState<string>(article.content)
  
    
    const [formState,action,isPending]=useActionState(editArticle.bind(null,article.id),{errors:{}})
   const handleSubmit=async(e:FormEvent< HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        formData.append("content",content);
        // formData.append("featuredImage",files[0]);
        console.log([...formData.entries()]);
        startTransition(()=>action(formData));
   }
  return (
    <div className='container mx-auto p-6'>
            <div className="">
      <div className=" w-full relative ">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl dark:bg-gray-900 bg-gray-100 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 dark:text-gray-300 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
 
          <form className='space-y-6 w-full' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                  <Label>Title</Label>
                    <Input type='text' defaultValue={article?.title} name='title' placeholder='Enter title for article...'/>
                    {
                        formState.errors.title && <p className='text-red-500 text-sm'>{formState.errors.title}</p>
                    }
                </div>
                
                <div className='space-y-2'>
                <Label>Category</Label>
                <select name="category" defaultValue={article.category} className='flex h-10 border w-full dark:bg-[#111827] rounded-md' id="">
                    <option value="">Select Category</option>
                    <option value="technology">Technology</option>
                    <option value="programming">Programming</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                </select>
                {
                    formState.errors.category && <p className='text-red-500 text-sm'>{formState.errors.category}</p>
                }
                </div>
                <div className='space-y-2'>
                    <Label>Featured Image</Label>
                    <div className='w-[50%] max-sm:w-[90%] mx-auto'>

                   <Input type='file' name='featuredImage' accept='image/*' />
                {
                    article.featuredImage  &&
                     <Image className='w-full h-fit object-cover rounded-md' width={200} height={200} src={article.featuredImage} alt='defaltimageofarticle'/>   
                }
                    </div>
                    {
                      formState.errors.featuredImage && <p className='text-red-500 text-sm'>{formState.errors.featuredImage}</p>
                    }

                </div>
                <div className='space-y-2'>
                    <Label>Content</Label>
                    <ReactQuill theme="snow" className='dark:text-white text-black ' value={content} onChange={setContent} placeholder='Write your article content...' />
                    {
                        formState.errors.content && <p className='text-red-500 text-sm'>{formState.errors.content[0]}</p>
                    }
                    {
                        formState.errors.formErrors && <p className='text-red-500 text-sm'>{formState.errors.formErrors[0]}</p>
                    }
                </div>
                <div className='flex justify-end gap-4'>
                    <Button  variant={"destructive"}>Cancel</Button>
                    <Button disabled={isPending} type='submit' className='bg-blue-500 text-white' variant={"outline"}>
                        {

                            isPending ? <Loader2 className='animate-spin'/> : "Update Article"
                        }
                        </Button>
                </div>

          </form>
 
          {/* Meaty part - Meteor effect */}
          {/* <Meteors number={20} /> */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default EditArticlePage;
