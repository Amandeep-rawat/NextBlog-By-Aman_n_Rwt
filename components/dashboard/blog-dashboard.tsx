import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import DashboardCards from './dashboard-cards';
import RecentActicles from './recent-articles';
import prisma from '@/lib/prisma';
// import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
const BLogDashboard = async() => {
  const {userId}=await auth();
  // console.log("user id",userId,"authid");
  
  const user=await prisma.user.findUnique({
    where:{
      clerkUserId:userId as string
    }
  });
  if(!user) return <h1>user not found</h1>;
  const [articles,totalComments]=await Promise.all([
    prisma.article.findMany({
      where:{authorId:user?.id}, 
      orderBy:{
        createdAt:"desc"
      },
      include:{
        comments:true,
        author:{
          select:{
            name:true,
            email:true,
            imageUrl:true,
          }
        }
      }
    }
    
  ),
   prisma.comment.count()
    
  ])
  // console.log(articles,totalComments);
  
  return (
    <main className='flex-1 p-4 md:p-8'>

    <div className='flex  justify-between items-center mb-4'>
      <div>

        <h1 className='font-bold text-2xl max-sm:text-xl max-[420px]:text-lg text-transparent bg-clip-text bg-gradient-to-br from-[#fc5675] to-[#31a5e0]'>Blog Dashboard</h1>
        <p className='max-sm:text-xs max-sm:max-w-48'>Manage Your Content and Analytics</p>
      </div>
      <Link className='flex  justify-center items-center gap-y-2' href={"/dashboard/articles/create"}><Button className='max-sm:text-xs'><PlusCircle/>New Article</Button></Link>
    </div>
    {/* Quick State */}
    
    <div className='border-b pb-3'>
      
      <DashboardCards articles={articles} totalComments={totalComments}/>
      
    </div>
    <RecentActicles articles={articles}/>
    </main>
  );
}

export default BLogDashboard;
