import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center justify-center mb-8">
            <img src="/logo.png" alt="Bharosa Shop" className="h-12 w-auto object-contain shrink-0" />
          </Link>

          <div className="bg-white border border-[#E7E0CE] rounded-2xl p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
