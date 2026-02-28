import Link from 'next/link';
import Image from 'next/image';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jobs = [
  {
    logo: '/latestjob/1.png',
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/2.png',
    title: 'Social Media Assistant',
    company: 'Netlify',
    location: 'Paris, France',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/3.png',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, USA',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/4.png',
    title: 'Brand Designer',
    company: 'Maze',
    location: 'San Fransisco, USA',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/5.png',
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/6.png',
    title: 'Interactive Developer',
    company: 'Udacity',
    location: 'Hamburg, Germany',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/7.png',
    title: 'HR Manager',
    company: 'Packer',
    location: 'Lucern, Switzerland',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
  {
    logo: '/latestjob/8.png',
    title: 'HR Manager',
    company: 'Webflow',
    location: 'Lucern, Switzerland',
    tags: ['Full-Time', 'Marketing', 'Design'],
  },
];

const tagStyles = {
  'Full-Time': 'bg-transparent text-[#4640DE] border border-[#4640DE]',
  Marketing: 'bg-transparent text-[#FFB836] border border-[#FFB836]',
  Design: 'bg-transparent text-[#25324B] border border-[#25324B]',
};

function JobCard({ job }) {
  return (
    <div className="flex items-start gap-5 p-5 bg-white border-b border-gray-100 last:border-b-0">
      {/* Logo */}
      <div className="w-16 h-16 shrink-0 relative">
        <Image
          src={job.logo}
          alt={job.company}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[#25324B]">{job.title}</h3>
        <p className="text-sm text-[#515B6F]">
          {job.company}
          <span className="mx-2 text-[#515B6F]">•</span>
          {job.location}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.tags.map((tag, i) => (
            <span
              key={i}
              className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyles[tag]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LatestJobs() {
  return (
    <section
      className={`${epilogue.className} relative overflow-hidden`}
      style={{
        backgroundImage: `url('/latestjob/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Decorative corner lines */}
      {/* Top-right corner lines */}
      <div className="absolute top-0 right-0 w-60 h-60 pointer-events-none hidden lg:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="240" y1="0" x2="120" y2="240" stroke="#D6CDFE" strokeWidth="1.5" />
          <line x1="200" y1="0" x2="80" y2="240" stroke="#D6CDFE" strokeWidth="1.5" />
          <line x1="160" y1="0" x2="40" y2="240" stroke="#D6CDFE" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom-left corner lines */}
      <div className="absolute bottom-0 left-0 w-60 h-60 pointer-events-none hidden lg:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="240" x2="120" y2="0" stroke="#D6CDFE" strokeWidth="1.5" />
          <line x1="40" y1="240" x2="160" y2="0" stroke="#D6CDFE" strokeWidth="1.5" />
          <line x1="80" y1="240" x2="200" y2="0" stroke="#D6CDFE" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-298 mx-auto px-4 sm:px-6 py-16 lg:py-20">
        {/* Header - Desktop */}
        <div className="hidden lg:flex items-end justify-between mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#25324B]">
            Latest{' '}
            <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:underline"
          >
            Show all jobs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Header - Mobile */}
        <div className="lg:hidden mb-8">
          <h2 className="text-3xl font-bold text-[#25324B]">
            Latest{' '}
            <span className="text-[#26A4FF]">jobs open</span>
          </h2>
        </div>

        {/* Desktop Grid: 2 columns, 4 rows */}
        <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-0">
          {jobs.map((job, i) => (
            <div key={i} className="border-b border-gray-200">
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Mobile: stacked list */}
        <div className="lg:hidden flex flex-col">
          {jobs.map((job, i) => (
            <div key={i} className="border-b border-gray-200">
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Mobile: Show all jobs link at bottom */}
        <div className="lg:hidden mt-6">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:underline"
          >
            Show all jobs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
