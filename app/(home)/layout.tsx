import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

const Layout = async({children}:{children:React.ReactNode}) => {
    const user=await currentUser();
    // if(!user)
    // {
    //     return null;
    // }
    if(user){

        const loggedInUser=await prisma.user.findUnique({
            where:{
                clerkUserId:user?.id
            }
        });
        if(!loggedInUser){
            await prisma.user.create({
                data:{
                    name:user?.fullName as string,
                    email:user?.emailAddresses[0].emailAddress as string,
                    clerkUserId:user?.id as string,
                    imageUrl:user?.imageUrl,
                    
                }
            })
        }
    }
    return (
    <div>
        {/* <h1 className='bg-black'>hello sir how </h1> */}
      {children}
    </div>
  );
}

export default Layout;
