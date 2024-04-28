// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Skeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative w-full mx-2`}>
        <PhotoSkeleton />
        <PhotoSkeleton />
        <PhotoSkeleton />
        <PhotoSkeleton />
        <PhotoSkeleton />
        <PhotoSkeleton />
    </div>
  );
}

function PhotoSkeleton() {
  return (
      <div className={`bg-gray-200 p-4 mt-8 w-full`} />
  )
}

