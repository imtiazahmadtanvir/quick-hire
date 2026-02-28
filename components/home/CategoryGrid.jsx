import Link from 'next/link';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const categories = [
  {
    name: 'Design',
    jobs: 235,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 4.64l9 9-14.72 14.72H3.64V19.36L18.36 4.64z" />
        <path d="M14.64 8.36l9 9" />
      </svg>
    ),
  },
  {
    name: 'Sales',
    jobs: 756,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="8" r="3" />
        <rect x="6" y="20" width="2" height="8" rx="1" />
        <rect x="11" y="16" width="2" height="12" rx="1" />
        <rect x="16" y="18" width="2" height="10" rx="1" />
        <rect x="21" y="14" width="2" height="14" rx="1" />
        <rect x="26" y="12" width="2" height="16" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Marketing',
    jobs: 140,
    highlighted: true,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4L10 10H4v8h6l12 6V4z" />
        <path d="M26 12a4 4 0 010 4" />
        <path d="M28 8a8 8 0 010 12" />
      </svg>
    ),
  },
  {
    name: 'Finance',
    jobs: 325,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <circle cx="16" cy="16" r="4" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Technology',
    jobs: 436,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="24" height="18" rx="2" />
        <path d="M10 28h12" />
        <path d="M16 22v6" />
      </svg>
    ),
  },
  {
    name: 'Engineering',
    jobs: 542,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8l-6 8 6 8" />
        <path d="M22 8l6 8-6 8" />
        <path d="M18 4l-4 24" />
      </svg>
    ),
  },
  {
    name: 'Business',
    jobs: 211,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="12" width="22" height="16" rx="2" />
        <path d="M11 12V8a5 5 0 0110 0v4" />
        <path d="M16 20v2" />
      </svg>
    ),
  },
  {
    name: 'Human Resource',
    jobs: 346,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="8" r="4" />
        <circle cx="8" cy="14" r="3" />
        <circle cx="24" cy="14" r="3" />
        <path d="M4 26c0-4 4-6 8-6h8c4 0 8 2 8 6" />
      </svg>
    ),
  },
];

export default function CategoryGrid() {
  return (
    <section className={`${epilogue.className} py-12 sm:py-16 lg:py-20 bg-white`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          {/* Show all jobs - desktop */}
          <Link
            href="/jobs"
            className="hidden sm:inline-flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:underline"
          >
            Show all jobs
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Desktop Grid: 4 columns x 2 rows */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${cat.name.toLowerCase()}`}
              className={`group relative p-6 lg:p-7 rounded-lg border transition-all duration-200 ${
                cat.highlighted
                  ? 'bg-[#4640DE] border-[#4640DE] text-white'
                  : 'bg-white border-gray-200 hover:bg-[#4640DE] hover:border-[#4640DE] text-gray-900 hover:text-white'
              }`}
            >
              {/* Icon */}
              <div
                className={`mb-6 lg:mb-8 ${
                  cat.highlighted
                    ? 'text-white'
                    : 'text-[#4640DE] group-hover:text-white'
                }`}
              >
                {cat.icon}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>

              {/* Jobs count + arrow */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    cat.highlighted
                      ? 'text-white/80'
                      : 'text-gray-500 group-hover:text-white/80'
                  }`}
                >
                  {cat.jobs} jobs available
                </span>
                <svg
                  className={`w-5 h-5 ${
                    cat.highlighted
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: vertical list cards */}
        <div className="sm:hidden space-y-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${cat.name.toLowerCase()}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#4640DE] transition-colors"
            >
              {/* Icon */}
              <div className="text-[#4640DE] shrink-0 w-12 h-12 flex items-center justify-center">
                {cat.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.jobs} jobs available</p>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Show all jobs - mobile */}
        <Link
          href="/jobs"
          className="sm:hidden inline-flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] mt-6 hover:underline"
        >
          Show all jobs
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}