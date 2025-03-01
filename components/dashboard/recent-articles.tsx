"use client"
import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ArrowRight, Check,  Edit, Trash2 } from 'lucide-react';
import type {  Prisma } from '@prisma/client';
import { deleteArticle } from '@/actions/delete-article';
// import { useFormStatus } from 'react-dom';
// import { IconBucket } from '@tabler/icons-react';
import {  useRouter } from 'next/navigation';

// import { useFormStatus } from 'react-dom';

type RecentArticlesProps = {
    articles: Prisma.ArticleGetPayload<{
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[]
}

const RecentActicles = ({ articles }: RecentArticlesProps) => {
    const router = useRouter();

    return (
        <div className='container mx-auto' >

            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                    <button className="relative w-full inline-flex cursor-default h-14  overflow-hidden rounded-md p-[2px] focus:outline-none ">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full  items-center justify-between rounded-md dark:bg-slate-950 bg-slate-950/40 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            <p>
                               Your Recent Articles
                            </p>
                           <Link href={'/articles'}>
                            <p className='text-gray-400 flex gap-1 items-center cursor-pointer'>
                                View Others <ArrowRight size={15} />
                            </p>
                           </Link>
                        </span>
                    </button>
                </CardHeader>
                {
                    !articles.length ? (<CardContent>
                        <p className='pl-6'>No Recent Articles. Create Your First Article. And You can visit your and others articles through <Link href={'/articles'}> <span className='text-red-500 underline'>All Article</span ></Link> Page</p>
                    </CardContent>) :
                        (

                            <CardContent>
                                <Table className='max-sm:text-[9px]'>
                                    <TableCaption>A list of your recent Articles.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Comments</TableHead>
                                            <TableHead >Date</TableHead>
                                            <TableHead >Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            articles.map((article)=>{
                                                return (

                                        <TableRow className='cursor-pointer' onClick={() => router.push(`/articles/${article.id}`)} key={article.id}>
                                            
                                            
                                            <TableCell className='font-bold max-sm:hidden' >{article.title.slice(0,17)}...</TableCell>
                                            <TableCell className='font-bold sm:hidden' >{article.title.slice(0,7)}</TableCell>
                                            <TableCell className="font-medium">
                                                <Badge className='bg-green-400 max-sm:hidden' variant="outline">Published</Badge>
                                                <Badge className='bg-green-400 sm:hidden' variant="outline"><Check size={11}/></Badge>
                                            </TableCell>
                                            <TableCell>{article.comments.length}</TableCell>
                                            <TableCell className='max-sm:hidden'>{article.createdAt.toDateString()}</TableCell>
                                            <TableCell className='sm:hidden text-[9px]'>{article.createdAt.toLocaleDateString("en-US", {
                                                        month: "short", // "Feb"
                                                    day: "2-digit", // "28"
                                                year: "2-digit", // "25"
                                                    })}
                                                    </TableCell>
                                            <TableCell>
                                                <div className='flex items-center justify-start gap-2'>
                                                  
                                                 
                                                        <div className='flex items-center'>

                                                        <Link className='hidden sm:block' href={`/dashboard/articles/${article.id}/edit`}><Button variant={"ghost"}>Edit</Button></Link>
                                                      <Link className='sm:hidden' href={`/dashboard/articles/${article.id}/edit`}><Button variant={"ghost"}><Edit/></Button></Link>
                                                      <DeleteButton articleId={article.id} />
                                                        </div>
                                                  
                                                </div></TableCell>
                                                
                                        </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>

                            </CardContent>
                        )
                }
                <CardFooter>
                    
                </CardFooter>
            </Card>






        </div>
    );
}

export default RecentActicles;


const DeleteButton = ({articleId}:{articleId:string}) => {
     const [isPending, startTransition] = useTransition();

    return (
        //  jab ham error handling nhi karni and na hi form ki jrrorat and client se handle karna he srver action ko 
      <form action={()=>{
        startTransition(async()=>{
          await deleteArticle(articleId);
        })
      }}>
        <Button className='max-sm:hidden' disabled={isPending} size={"sm"} type="submit" variant={"destructive"}>
          {isPending ? "Deleting..." : "Delete"}
        </Button>
        <Button className='sm:hidden' disabled={isPending} size={"sm"} type="submit" variant={"ghost"}>
          {isPending ? "..." : <Trash2 fill='red'/>}
        </Button>
      </form>
    );
  };

// ✅ Jab client component me form ka use karna ho,
// ✅ Pending state aur error handling bhi chahiye ho,
// ✅ Aur saath me FormData bhi bhejna ho,
// ✅ Tab hamesha `useActionState` ka use karein.
  
// and 

// ✅ Agar client component me form ka use nahi karna,
// ✅ Sirf button click pe server action call karna ho,
// ✅ Aur pending state handle karni ho (but error handling nahi chahiye),
// ✅ Tab `useTransition` use karein.

  /* 
  "use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/actions";
import { Button } from "@/components/ui/button";

const DeleteButton = ({ articleId }: { articleId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteArticle(articleId); // ✅ Server action call
    });
  };

  return (
    <Button disabled={isPending} onClick={handleDelete} size={"sm"} variant={"destructive"}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
 */