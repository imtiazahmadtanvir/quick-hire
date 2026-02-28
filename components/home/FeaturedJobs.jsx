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
    logo: '/feature/1.png',
    type: 'Full Time',
    title: 'Email Marketing',
    company: 'Revolut',
    location: 'Madrid, Spain',
    description: 'Revolut is looking for Email Marketing to help team ma ...',
    tags: [
      { label: 'Marketing', color: 'orange' },
      { label: 'Design', color: 'green' },
    ],
  },
  {
    logo: '/feature/2.png',
    type: 'Full Time',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, US',
    description: 'Dropbox is looking for Brand Designer to help the team t ...',
    tags: [
      { label: 'Design', color: 'green' },
      { label: 'Business', color: 'dark' },
    ],
  },
  {
    logo: '/feature/3.png',
    type: 'Full Time',
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    description: 'Pitch is looking for Customer Manager to join marketing t ...',
    tags: [{ label: 'Marketing', color: 'orange' }],
  },
  {
    logo: '/feature/4.png',
    type: 'Full Time',
    title: 'Visual Designer',
    company: 'Blinklist',
    location: 'Granada, Spain',
    description: 'Blinklist is looking for Visual Designer to help team desi ...',
    tags: [{ label: 'Design', color: 'green' }],
  },
  {
    logo: '/feature/5.png',
    type: 'Full Time',
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    description: 'ClassPass is looking for Product Designer to help us...',
    tags: [
      { label: 'Marketing', color: 'orange' },
      { label: 'Design', color: 'green' },
    ],
  },
  {
    logo: '/feature/6.png',
    type: 'Full Time',
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    description: 'Canva is looking for Lead Engineer to help develop n ...',
    tags: [
      { label: 'Design', color: 'green' },
      { label: 'Business', color: 'dark' },
    ],
  },
  {
    logo: '/feature/7.png',
    type: 'Full Time',
    title: 'Brand Strategist',
    company: 'GoDaddy',
    location: 'Marseille, France',
    description: 'GoDaddy is looking for Brand Strategist to join the team...',
    tags: [{ label: 'Marketing', color: 'orange' }],
  },
  {
    logo: '/feature/8.png',
    type: 'Full Time',
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    description: 'Twitter is looking for Data Analyst to help team desi ...',
    tags: [{ label: 'Technology', color: 'red' }],
  },
];

const tagStyles = {
  orange: 'bg-[#FFB836]/10 text-[#FFB836] border border-[#FFB836]/20',
  green: 'bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20',
  dark: 'bg-transparent text-[#4640DE] border border-[#4640DE]/30',
  red: 'bg-[#FF6550]/10 text-[#FF6550] border border-[#FF6550]/20',
};

function JobCard({ job }) {
  return (
    <div className="border border-gray-200 rounded-md p-6 flex flex-col gap-4 hover:shadow-md transition-shadow bg-white min-w-70">
      {/* Top row: logo + badge */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 relative shrink-0">
          <Image
            src={job.logo}
            alt={job.company}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium text-[#4640DE] border border-[#4640DE] rounded px-3 py-1">
          {job.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#25324B]">{job.title}</h3>

      {/* Company · Location */}
      <p className="text-sm text-[#515B6F]">
        {job.company}{' '}
        <span className="mx-1 text-[#D6DDEB]">•</span>{' '}
        {job.location}
      </p>

      {/* Description */}
      <p className="text-base text-[#7C8493] leading-relaxed flex-1">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {job.tags.map((tag, i) => (
          <span
            key={i}
            className={`text-sm font-medium px-3 py-1 rounded-full ${tagStyles[tag.color]}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedJobs() {
  return (
    <section className={`${epilogue.className} py-16 lg:py-20 bg-white`}>
      <div className="max-w-298 mx-auto px-4 sm:px-6">
        {/* Header - Desktop */}
        <div className="hidden lg:flex items-end justify-between mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#25324B]">
            Featured{' '}
            <span className="text-[#26A4FF]">jobs</span>
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
            Featured{' '}
            <span className="text-[#26A4FF]">jobs</span>
          </h2>
        </div>

        {/* Desktop Grid: 4 columns × 2 rows */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {jobs.map((job, i) => (
              <div key={i} className="w-75 shrink-0">
                <JobCard job={job} />
              </div>
            ))}
          </div>
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
