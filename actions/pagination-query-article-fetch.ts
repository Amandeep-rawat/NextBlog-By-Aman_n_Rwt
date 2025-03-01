"use server"

import prisma from "@/lib/prisma";

export const fetchArticleByQuery=async(searchText:string,skip:number,take:number)=>{

    // 1 se jyada info chiye to trasaction use hota he or primises.all

    const [articles,total]=await prisma.$transaction([
        prisma.article.findMany({
          orderBy:{
            createdAt:"desc"
          },
          where:{
            
            OR:
            [
              {title:{contains:searchText,mode:'insensitive'}},
              {category:{contains:searchText,mode:"insensitive"}}
            ],
          
        },
        include:{
          author:{
            select:{
              name:true,
              imageUrl:true,
              
            }
          },
          
          
        },
        skip:skip,
        take:take
      }),
      prisma.article.count({
        where:{
          OR:
          [
            {title:{contains:searchText,mode:'insensitive'}},
            {category:{contains:searchText,mode:"insensitive"}}
          ],
        
      },
      
      })
      
      
      ]);

      return {articles,total};
      
}