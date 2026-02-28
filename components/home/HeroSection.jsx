'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function Hero() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('Florence, Italy');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', jobTitle, 'in', location);
  };

  return (
    <section className="relative pt-[72px] overflow-hidden bg-gradient-to-br from-white via-white to-indigo-50/40">
      {/* Decorative geometric shapes (desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {/* Top-right rotated square */}
        <div className="absolute top-24 right-[15%] w-[320px] h-[320px] border-[1.5px] border-indigo-200/60 rounded-xl rotate-12" />
        {/* Middle-right square */}
        <div className="absolute top-[40%] right-[8%] w-[200px] h-[200px] border-[1.5px] border-indigo-200/40 rounded-xl -rotate-6" />
        {/* Bottom-right shapes */}
        <div className="absolute bottom-12 right-[18%] w-[260px] h-[260px] border-[1.5px] border-indigo-200/50 rounded-xl rotate-[20deg]" />
        <div className="absolute bottom-28 right-[30%] w-[180px] h-[180px] border-[1.5px] border-indigo-100/60 rounded-xl -rotate-12" />
      </div>

      {/* Mobile decorative shapes */}
      <div className="lg:hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-[60%] right-[-20px] w-[160px] h-[160px] border-[1.5px] border-indigo-200/40 rounded-xl rotate-12" />
        <div className="absolute bottom-8 right-[10%] w-[120px] h-[120px] border-[1.5px] border-indigo-200/30 rounded-xl -rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-end min-h-[calc(100vh-72px)] lg:min-h-0 lg:py-16">
          {/* Left Content */}
          <div className="pt-10 sm:pt-14 lg:pt-12 pb-8 lg:pb-20 space-y-6 sm:space-y-8 relative z-10">
            {/* Heading */}
            <div>
              <h1 className={`${epilogue.className} text-[42px] sm:text-[52px] lg:text-[56px] xl:text-[64px] font-bold text-gray-900 leading-[1.1] tracking-tight`}>
                Discover
                <br />
                more than
                <br />
                <span className="text-[#26A4FF] inline-block">
                  5000+ Jobs
                  {/* Hand-drawn underline */}
                  <svg
                    className="w-full mt-1"
                    viewBox="0 0 340 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 13C40 5 90 3 150 6C210 9 270 7 338 10"
                      stroke="#26A4FF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M5 17C50 8 110 5 170 8C230 11 290 6 335 12"
                      stroke="#26A4FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M8 11C60 4 130 2 200 5C260 8 300 4 332 8"
                      stroke="#26A4FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className={`${epilogue.className} text-base sm:text-lg text-gray-500 max-w-md leading-relaxed`}>
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch}>
              {/* Desktop: horizontal layout */}
              <div className="bg-white rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                  {/* Job Input */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <svg className="w-5 h-5 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full outline-none text-gray-800 placeholder-gray-400 text-[15px] bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Divider (desktop only) */}
                  <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1 self-center" />

                  {/* Location Input */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <svg className="w-5 h-5 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full outline-none text-gray-800 bg-transparent cursor-pointer text-[15px] appearance-none"
                      >
                        <option>Florence, Italy</option>
                        <option>Milan, Italy</option>
                        <option>Rome, Italy</option>
                        <option>New York, USA</option>
                        <option>Los Angeles, USA</option>
                        <option>London, UK</option>
                      </select>
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className={`${epilogue.className} bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-8 py-3.5 rounded-md transition-colors whitespace-nowrap text-[15px] w-full sm:w-auto`}
                  >
                    Search my job
                  </button>
                </div>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span className={`${epilogue.className} text-sm text-gray-500`}>Popular :</span>
              <span className={`${epilogue.className} text-sm font-medium text-gray-700`}>UI Designer,</span>
              <span className={`${epilogue.className} text-sm font-medium text-gray-700`}>UX Researcher,</span>
              <span className={`${epilogue.className} text-sm font-medium text-gray-700`}>Android,</span>
              <span className={`${epilogue.className} text-sm font-medium text-gray-700`}>Admin</span>
            </div>
          </div>

          {/* Right Side - Hero Image (Desktop only) */}
          <div className="hidden lg:flex justify-end items-end relative">
            <div className="relative z-10">
              <Image
                src="/hero-man.png"
                alt="Man pointing at QuickHire"
                width={480}
                height={560}
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
