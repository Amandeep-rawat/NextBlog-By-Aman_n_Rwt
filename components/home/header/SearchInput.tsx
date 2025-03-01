
import { searchAction } from '@/actions/search';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const SearchInput = ({ className,wrapperClassName }: { className?: string;wrapperClassName?:string }) => {
  const searchParams=useSearchParams()
  
 
  
  return (
    <form action={searchAction} className={wrapperClassName}>
      <div className='relative'>
      <Search className='absolute  left-3 transform translate-y-1/2  h-4 w-4  text-muted-foreground'/>
      </div>
        <Input type='text' name='search' defaultValue={searchParams.get("search") || ""} className={` border  focus-visible:ring-1  ${className}`}placeholder='Search an article... '/>
    </form>
  );
}

export default SearchInput;
