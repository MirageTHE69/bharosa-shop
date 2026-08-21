export default function Loading() {
  return (
    <div className="bg-[#FBF9F4] animate-pulse">
      <div className="h-56 sm:h-64 bg-[#F4EEE1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-[#F4EEE1] rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
