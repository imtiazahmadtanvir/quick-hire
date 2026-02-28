import Link from 'next/link';
import Image from 'next/image';
import { Epilogue, Red_Hat_Display } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const aboutLinks = [
  { label: 'Companies', href: '/companies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Terms', href: '/terms' },
  { label: 'Advice', href: '/advice' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const resourceLinks = [
  { label: 'Help Docs', href: '/help' },
  { label: 'Guide', href: '/guide' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className={`${epilogue.className} bg-[#202430] text-white`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10 sm:pb-14">
          {/* Logo & Description */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/quickhire-logo.png"
                alt="QuickHire Logo"
                width={32}
                height={32}
              />
              <span className={`${redHat.className} font-extrabold text-xl text-white tracking-tight`}>
                QuickHire
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-base mb-5">About</h4>
            <ul className="space-y-3.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-base mb-5">Resources</h4>
            <ul className="space-y-3.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Job Notifications */}
          <div>
            <h4 className="font-semibold text-base mb-4">Get job notifications</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white/10 border border-gray-600 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#4640DE] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-5 py-2.5 rounded-md text-sm transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-gray-500 text-sm">
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* Dribbble */}
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Dribbble">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.172 10.172 0 004.392-6.87zM16.13 21.51c-.15-.88-.748-3.996-2.167-7.737l-.065.02c-5.79 2.015-7.86 6.025-8.04 6.39a10.17 10.17 0 006.14 2.067 10.14 10.14 0 004.13-.74zm-12.2-2.16c.234-.413 3.04-5.16 8.32-6.89.132-.043.265-.08.398-.117a42.34 42.34 0 00-.825-1.74C7.7 12.01 3.73 11.96 3.24 11.95c-.01.17-.01.33-.01.5a10.17 10.17 0 003.7 7.9zM3.52 10.17c.5.01 3.97.02 7.77-1.23A75.448 75.448 0 007.76 3.42a10.18 10.18 0 00-4.24 6.75zM9.6 2.65c.64 1.13 1.98 3.53 3.55 5.68 3.35-1.26 4.77-3.17 4.95-3.42A10.15 10.15 0 0012 2.01c-.83 0-1.64.1-2.4.28v.36zm9.9 3.55c-.2.27-1.77 2.3-5.27 3.75.264.537.52 1.084.76 1.62.08.18.168.36.24.545 3.41-.427 6.8.272 7.13.34a10.14 10.14 0 00-2.86-6.25z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}