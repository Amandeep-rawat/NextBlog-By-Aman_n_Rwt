import ArticleDetailedPage from '@/components/dashboard/articles/article-detailed-page';
import prisma from '@/lib/prisma';
import React from 'react';
type ArticleDetailedPageProps={
  params:Promise<{id:string}>
}
const page = async({params}:ArticleDetailedPageProps) => {
  const {id}=await params;
  const article=await prisma.article.findUnique({where:{id},include:{author:{select:{name:true,email:true,imageUrl:true}}}});
  if(!article){
    return <h1>Article not found for this Id</h1>
  }
  return (
    <div>
      <ArticleDetailedPage
       article={article}
       />   
    </div>
  );
}

export default page;
