"use client"
import React from 'react';
import { Input } from './input';
import { useSearchParams } from "next/navigation";
import { searchAction } from '@/actions/search';
import { Search } from 'lucide-react';

const PlaceholdersAndVanishInput = () => {
  const searchParams = useSearchParams();

  return (
    <div className='w-full text-center mx-auto'>
      <form className='text-center mx-auto relative w-full max-w-lg' action={searchAction}>
        
        {/* Input with Search Icon & Button */}
        <div className="relative w-full mx-auto">
          {/* Search Icon */}
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            width={24} 
            height={24} 
          />

          {/* Input Field */}
          <Input 
            className="w-full pl-12 pr-14 py-6 rounded-full border border-gray-300   
                      focus:outline-none focus:ring-2 focus:ring-transparent 
                      focus:border-transparent focus-within:border-transparent 
                      transition-all duration-300 shadow-lg
                      focus-visible:ring-2 focus-visible:ring-offset-2 
                      focus-visible:ring-gradient-to-r from-purple-400 to-blue-500"
            type="text" 
            defaultValue={searchParams.get("search") || ""} 
            name="search" 
            placeholder="Search Here..." 
          />

          {/* Search Button */}
          <button 
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 
                      text-white px-10 py-3 rounded-full shadow-md transition-all duration-300 
                      hover:from-blue-500 hover:to-purple-500 hover:scale-105 focus:outline-none"
          >
            Go
          </button>
        </div>

      </form>
    </div>
  );
}

export default PlaceholdersAndVanishInput;
