import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/polls-logo.svg"
                alt="Polls logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Log In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
