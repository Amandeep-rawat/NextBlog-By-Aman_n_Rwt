import LeftSideBar from '@/components/dashboard/LeftSideBar';
import React from 'react';

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen  w-full  flex'>
      <div className=''>

        <LeftSideBar/>
      </div>
      <div className='flex-1 max-md:pt-12 py-2 container mx-auto'>
      {children}

      </div>
    </div>
  );
}

export default layout;
