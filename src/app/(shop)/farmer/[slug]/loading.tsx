export default function Loading() {
  return (
    <div className="bg-[#FBF9F4] animate-pulse">
      <div className="h-48 sm:h-56 bg-[#F4EEE1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 h-64 bg-[#F4EEE1] rounded-2xl" />
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-[#F4EEE1] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
