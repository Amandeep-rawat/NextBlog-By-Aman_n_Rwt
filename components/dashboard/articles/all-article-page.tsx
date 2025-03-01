import { GlowingEffectDemo } from '@/components/ui/glowing-effect-demo';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { title } from 'process';
import React from 'react';
import type { Article } from '@prisma/client';
type AllArticlesPageProps={
  articles:Prisma.ArticleGetPayload<{
    include:{
      author:{
        select:{
          name:true,
          imageUrl:true,

        }
      }
    }
  }>[]
}
type ALLARTICAL = {
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
export default async function AllArticlesPage({articles}:AllArticlesPageProps) {
  // console.log("searchtext value is ",searchText);
  
//   let articles;
//   // if(searchText){
//      articles=await prisma.article.findMany({
//       where:{
//         OR:
//         [
//           {title:{contains:searchText,mode:'insensitive'}},
//           {category:{contains:searchText,mode:"insensitive"}}
//         ],
      
//     },
//     include:{
//       author:{
//         select:{
//           name:true,
//           imageUrl:true,
          
//         }
//       },
//       _count: {
//         select: {
//           comments: true,
//         },
//       },
//     }
//   }
// )
// }
// else{

//    articles = await prisma.article.findMany({
//     orderBy: { createdAt: "desc" },
//     include: {
//       author: {
//         select: {
//           name: true,
//           imageUrl: true,
//         },
//       },
//       _count: {
//         select: {
//           comments: true,
//         },
//       },
//     },
//   });
// }

if(!articles.length){
  return (
    <div className='flex justify-center items-center flex-col'>

  <h1 className='font-bold text-3xl'>No Article Found With Your Query </h1>
      <p className='text-3xl'>🥹</p>
    </div>
  )
}



  return <GlowingEffectDemo articles={articles} />;
}
