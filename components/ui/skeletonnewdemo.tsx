import { Skeleton } from "./skeleton";

 
export function SkeletonDemo() {
  return (
    <div className="min-h-screen container mx-auto my-auto justify-center items-center flex">

    <div className="grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-4">
  {[1, 2, 3].map((_, index) => (
    <div key={index} className="flex border-gray-800 border rounded-xl justify-center items-center  flex-col space-y-3">
    <Skeleton className="h-[300px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
  ))}
</div>
  </div>

  )
}