import EditArticlePage from '@/components/dashboard/articles/edit/edit-article-page';
import prisma from '@/lib/prisma';
import React from 'react';

type EditArticleParams={
    params:Promise<{id:string}>
}
const page = async({params}:EditArticleParams) => {
    const {id}=await params;

    const article=await prisma.article.findUnique({
        where:{
            id
        }
    })
    // console.log(article);
        if(!article){
            return <h1>Article not found for this Id</h1>
        }    
  return (
    <div>
        <EditArticlePage article={article}/>

        </div>
  );
}

export default page;
