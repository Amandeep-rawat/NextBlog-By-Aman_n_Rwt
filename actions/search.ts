"use server"

import { redirect } from "next/navigation"
import { string } from "zod"

export const searchAction=async(formData:FormData)=>{
    const searchtext=formData.get("search");
    if(typeof(searchtext)!=="string" ||!searchtext){
        redirect("/");
    }
    redirect(`/articles?search=${searchtext}`)
}
