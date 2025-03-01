"use server"
import {z} from "zod"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {v2 as cloudinary,UploadApiResponse} from 'cloudinary'
import { error } from "console"
import { revalidatePath } from "next/cache"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const createArticleSchema=z.object({
    title:z.string().min(3,{message:"Title must be at least 3 characters long"}).max(100,{message:"Title must be at most 100 characters long"}),
    category:z.string().min(3,{message:"Category must be at least 3 characters long"}).max(50,{message:"Category must be at most 50 characters long"}),
    content:z.string().min(10,{message:"Content must be at least 10 characters long"}),

})


 type createArticleFormState={
    errors:{
        title?:string[];
        category?:string[];
        featuredImage?:string[];
        content?:string[];
        formErrors?:string[]
    }
}
export const createArticle=async(prevState:createArticleFormState,formdata:FormData):Promise<createArticleFormState>=>{
    // const result=createArticleSchema.safeParse(formdata);
    // another method
    const result=createArticleSchema.safeParse({
        title:formdata.get("title") as string,
        category:formdata.get("category") as string,
        content:formdata.get("content") as string,
    })
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors
        }
    }

    const {userId}=await auth();
    if(!userId){
        return{

            errors:{
                formErrors:["you have to login first"]
            }
        } 
    }

    // find existing user 
    const user=await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }
    });

    if(!user){
        return{
            errors:{
                formErrors:["user not found"]
            }
        }
    }
    const authorId=user.id;

    // add articles here 
    const imageFile=formdata.get('featuredImage') as File |null;
    if(!imageFile ||imageFile.name==="undefined"){
            return {
                errors:{
                    featuredImage:["you have to upload an image"]
                }
            }
    }
    const arrayBuffer=await imageFile.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);
   const uploadResponse:UploadApiResponse|undefined=await new Promise((resolve,reject)=>{
    const uploadStream=cloudinary.uploader.upload_stream({resource_type:"auto"},(error,result)=>{
        if(error){
            reject(error)
        }
        else{
            resolve(result);
        }
   });
   uploadStream.end(buffer);
   });

   const imageUrl=uploadResponse?.secure_url;
   if(!imageUrl){
    return {
        errors:{
            featuredImage:["Failed to upload image"]
        }
    }}

    try {
        const article=await prisma.article.create({
            data:{
                title:result.data.title,
                category:result.data.category,
                content:result.data.content,
                authorId:user.id,
                featuredImage:imageUrl
            }
        })
    } catch (error:unknown) {
        if(error instanceof Error){
            return{
                errors:{
                    formErrors:[error.message]
                }
            }
        }
        else{
            return{
                errors:{
                    formErrors:["something went wrong"]
                }
            }
        }
    }
    revalidatePath("/dashboard");
    redirect("/dashboard")
}