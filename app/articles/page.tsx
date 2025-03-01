import { Skeleton } from "@/components/ui/skeleton"
import AllArticlesPage from '@/components/dashboard/articles/all-article-page';
import { ArticleSearchInput } from '@/components/dashboard/articles/article-search-input';
import { Button } from '@/components/ui/button';
import React, { Suspense } from 'react';
// import prisma from "@/lib/prisma";
import { fetchArticleByQuery } from "@/actions/pagination-query-article-fetch";
import Link from "next/link";

type SearchPageProps={
  searchParams:Promise<{search?:string;page?:string}>
}

const ITEMS_PER_PAGE:number=3;
const page:React.FC<SearchPageProps> = async({searchParams}) => {
  const searchText =(await searchParams).search ||"";
  const currentPage=Number((await searchParams).page) || 1;
const skip:number=(currentPage-1)*ITEMS_PER_PAGE;

const take=ITEMS_PER_PAGE;
 
// wihtout pagination note:jab text nhi he to wo sari return karega ""
// const articles=await prisma.article.findMany({
//     where:{
//       OR:
//       [
//         {title:{contains:searchText,mode:'insensitive'}},
//         {category:{contains:searchText,mode:"insensitive"}}
//       ],
    
//   },
//   include:{
//     author:{
//       select:{
//         name:true,
//         imageUrl:true,
        
//       }
//     },
//     _count: {
//       select: {
//         comments: true,
//       },
//     },
//   }
// })

// with paggination 
// wese to yaha pe vi kar sakte the upper wale ki tarah but maine alag kiya he taki return vi sikh jae. 
const {articles,total}=await fetchArticleByQuery(searchText,skip,take);
const totalPages=Math.ceil(total/ITEMS_PER_PAGE);



    
  return (
    <Suspense fallback={<SkeletonDemo/>}>

    <div className='min-h-screen bg-background '>
        <main className='container mx-auto px-4 py-12 sm:px-6 '>
            {/* page header */}

            <div className='mb-12 space-y-6 text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>All Articles</h1>
                {/* search bar */}
                <ArticleSearchInput/>
            </div>
            {/* All article card / */}
            {/* <Suspense fallback={<SkeletonDemo/>}> */}

                <AllArticlesPage articles={articles}/>        
            


        {/* pagination  */}
        <div className='mt-12 flex justify-center gap-2'>
          <Link  href={`?search=${searchText}&page=${currentPage-1}` } passHref>
            <Button disabled={currentPage===1} variant={"ghost"}>Previous ←</Button>
          </Link>
        {
          Array.from({length:totalPages}).map((_,index)=>{
           return(
             
             <Link key={index} href={`?search=${searchText}&page=${index+1}` } passHref>
              <Button variant={index+1==currentPage? "destructive":"ghost"}>{index+1}</Button>

            </Link>
            )
          })
        }

          <Link  href={`?search=${searchText}&page=${currentPage+1}` } passHref>
            <Button disabled={currentPage===totalPages} variant={"ghost"}>Next →</Button>
          </Link>
            
        </div>
        </main>
    </div>
            </Suspense>
  );
}

export default page;



 
export function SkeletonDemo() {
  return (
    <div className="min-h-screen container mx-auto my-auto justify-center items-center flex">

    <div className="grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4">
  {[1, 2, 3].map((_, index) => (
    <div key={index} className="flex border-gray-800 border rounded-xl justify-center items-center  flex-col space-y-3">
    <Skeleton className="h-[300px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
  ))}
</div>
  </div>

  )
}


