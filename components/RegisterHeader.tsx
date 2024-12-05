import Link from 'next/link';
import { ArrowLeft} from 'lucide-react';

export function RegisterHeader() {
  return (
    <header className="absolute top-0 inset-x-0 flex items-center justify-end p-4">
      {/* <Link 
        href="/" 
        className="text-2xl font-bold text-gray-800 dark:text-zinc-50"
      >
        Assistant.
      </Link> */}
      <div className="flex items-center gap-2">
        <Link 
          href="/login" 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-gray-700 hover:bg-gray-100 rounded-md 
          dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Login
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-gray-700 hover:bg-gray-100 rounded-md 
          dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </header>
  );
}