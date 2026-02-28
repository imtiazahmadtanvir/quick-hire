'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Epilogue, Red_Hat_Display } from 'next/font/google';
import { useState } from 'react';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/quickhire-logo.png"
              alt="QuickHire Logo"
              width={36}
              height={36}
            />
            <span className={`${redHat.className} font-extrabold text-[22px] text-gray-900 tracking-tight`}>
              QuickHire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 ml-12">
            <Link
              href="/jobs"
              className={`${epilogue.className} text-[15px] text-gray-500 hover:text-[#4640DE] font-medium transition-colors`}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className={`${epilogue.className} text-[15px] text-gray-500 hover:text-[#4640DE] font-medium transition-colors`}
            >
              Browse Companies
            </Link>
          </div>

          {/* Spacer */}
          <div className="hidden lg:flex flex-1" />

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/login"
              className={`${epilogue.className} text-[#4640DE] hover:text-[#3530b8] font-semibold text-[15px] transition-colors`}
            >
              Login
            </Link>
            <span className="w-px h-6 bg-gray-200" />
            <Link
              href="/signup"
              className={`${epilogue.className} bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold text-[15px] px-6 py-2.5 rounded-md transition-colors`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-gray-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-80 pb-6' : 'max-h-0'
          }`}
        >
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <Link
              href="/jobs"
              className={`${epilogue.className} block text-gray-600 hover:text-[#4640DE] hover:bg-indigo-50 font-medium py-3 px-3 rounded-lg transition-colors`}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className={`${epilogue.className} block text-gray-600 hover:text-[#4640DE] hover:bg-indigo-50 font-medium py-3 px-3 rounded-lg transition-colors`}
            >
              Browse Companies
            </Link>
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/login"
                className={`${epilogue.className} flex-1 text-center text-[#4640DE] font-semibold py-2.5 border border-[#4640DE] rounded-md transition-colors hover:bg-indigo-50`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`${epilogue.className} flex-1 text-center bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold py-2.5 rounded-md transition-colors`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
