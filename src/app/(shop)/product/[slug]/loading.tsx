export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#F4EEE1] aspect-square" />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="h-8 bg-[#F4EEE1] rounded-lg w-2/3" />
          <div className="h-4 bg-[#F4EEE1] rounded-lg w-1/3" />
          <div className="h-24 bg-[#F4EEE1] rounded-lg" />
          <div className="h-40 bg-[#F4EEE1] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
