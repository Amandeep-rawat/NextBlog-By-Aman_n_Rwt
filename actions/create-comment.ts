"use server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import {z} from "zod"

const createCommentSchema=z.object({
    body:z.string().min(3,{message:"Comment must be at least 3 characters long"}).max(1000,{message:"Comment must be at most 1000 characters long"})
})
type createCommentFormState={
    errors:{
        body?:string[];
        formErrors?:string[];
    }
}
export const createComment=async(articleId:string,prevState:createCommentFormState,formData:FormData):Promise<createCommentFormState>=>{
const result=createCommentSchema.safeParse({body:formData.get("body") as string});
if(!result.success){
    return {
        errors:result.error.flatten().fieldErrors
    }

}
const {userId}=await auth();
if(!userId){
    return {
        errors:{
            formErrors:["you have to login first"]
        }
    }
}
const existingUser=await prisma.user.findUnique({
    where:{
        clerkUserId:userId
    }
})
if(!existingUser){
    return {
        errors:{
            formErrors:["you have to login first"]
        }
    }
}

try {
    await prisma.comment.create({
        data:{
            body:result.data.body as string,
            authorId:existingUser.id as string,
            articleId:articleId,


        }
    });

} catch (error:unknown) {
    if(error instanceof Error){
        return {
            errors:{
                formErrors:[error.message]
            }
        }
    }
    else{
        return {
            errors:{
                formErrors:["something went wrong"]
            }
        }
    }
}
revalidatePath(`/articles/${articleId}`);
return {
    errors:{}
}
}