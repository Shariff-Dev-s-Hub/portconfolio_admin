import { Skeleton } from "@/components/ui/skeleton";

export function HeroLayoutAlignmentSkeletons() {
  return (
    <div className="flex flex-col gap-4 mt-5">
      <Skeleton className="h-8 w-1/4 bg-[#edc776]" />
      <div className="flex flex-col lg:flex-row gap-4">
        <Skeleton className="h-64 w-full bg-[#edc776]" />
        <div className="flex gap-3 justify-center lg:justify-items-normal">
          <Skeleton className="h-64 bg-[#edc776] w-10" />
          <div className="flex flex-col justify-between">
            {/* Array of 4 */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-40 bg-[#edc776] h-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
