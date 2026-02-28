'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Epilogue } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const JOB_TYPES = ['full-time', 'part-time', 'remote', 'contract', 'internship'];
const CATEGORIES = [
  'Technology', 'Design', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'HR', 'Other',
];

const tagStyles = {
  'full-time': 'bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20',
  'part-time': 'bg-[#26A4FF]/10 text-[#26A4FF] border border-[#26A4FF]/20',
  remote: 'bg-[#4640DE]/10 text-[#4640DE] border border-[#4640DE]/20',
  contract: 'bg-[#FFB836]/10 text-[#FFB836] border border-[#FFB836]/20',
  internship: 'bg-[#FF6550]/10 text-[#FF6550] border border-[#FF6550]/20',
};

const categoryColors = {
  Technology: 'text-[#4640DE] border-[#4640DE]/30',
  Design: 'text-[#56CDAD] border-[#56CDAD]/30',
  Marketing: 'text-[#FFB836] border-[#FFB836]/30',
  Finance: 'text-[#26A4FF] border-[#26A4FF]/30',
  Healthcare: 'text-[#FF6550] border-[#FF6550]/30',
  Education: 'text-[#4640DE] border-[#4640DE]/30',
  Engineering: 'text-[#56CDAD] border-[#56CDAD]/30',
  Sales: 'text-[#FFB836] border-[#FFB836]/30',
  HR: 'text-[#26A4FF] border-[#26A4FF]/30',
  Other: 'text-[#25324B] border-[#25324B]/30',
};

function TypeBadge({ type }) {
  return (
    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${tagStyles[type] || 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
      {type}
    </span>
  );
}

function JobCard({ job }) {
  const salary =
    job.salaryMin && job.salaryMax
      ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
      : job.salaryMin
      ? `From $${job.salaryMin.toLocaleString()}`
      : job.salary || null;

  return (
    <Link href={`/jobs/${job._id}`} className="flex flex-col gap-4 border border-gray-200 rounded-md p-6 hover:shadow-md transition-shadow bg-white group">
      {/* Top row: icon + badge */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0 overflow-hidden">
          {job.companyLogo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-[#4640DE] font-bold text-base">{job.company?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <span className="text-sm font-medium text-[#4640DE] border border-[#4640DE] rounded px-3 py-1 capitalize">
          {job.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#25324B] group-hover:text-[#4640DE] transition-colors">
        {job.title}
      </h3>

      {/* Company · Location */}
      <p className="text-sm text-[#515B6F]">
        {job.company}
        <span className="mx-1 text-[#D6DDEB]">•</span>
        {job.location}
      </p>

      {/* Description */}
      <p className="text-base text-[#7C8493] leading-relaxed line-clamp-2 flex-1">
        {job.description}
      </p>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <span className={`text-sm font-medium px-3 py-1 rounded-full border bg-transparent ${categoryColors[job.category] || 'text-[#25324B] border-[#25324B]/30'}`}>
          {job.category}
        </span>
        {salary && (
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20">
            {salary}
          </span>
        )}
        <span className="ml-auto text-xs text-[#7C8493]">
          {job.applicantsCount} applicant{job.applicantsCount !== 1 ? 's' : ''}
        </span>
      </div>
    </Link>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });

  const fetchJobs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedType) params.set('type', selectedType);
      if (selectedCategory) params.set('category', selectedCategory);
      params.set('page', String(page));
      params.set('limit', '12');

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
        setPagination(data.pagination);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [search, selectedType, selectedCategory]);

  useEffect(() => {
    fetchJobs(1);
  }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setSearch('');
    setSearchInput('');
    setSelectedType('');
    setSelectedCategory('');
  };

  const hasFilters = search || selectedType || selectedCategory;

  return (
    <div className={`${epilogue.className} min-h-screen bg-white`}>
      <Navbar />

      {/* Hero-style header */}
      <section className="relative pt-18 overflow-hidden bg-linear-to-br from-white via-white to-indigo-50/40">
        {/* Decorative geometric shapes */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-[12%] w-70 h-70 border-[1.5px] border-indigo-200/50 rounded-xl rotate-12" />
          <div className="absolute top-[50%] right-[6%] w-45 h-45 border-[1.5px] border-indigo-200/35 rounded-xl -rotate-6" />
          <div className="absolute bottom-4 right-[22%] w-55 h-55 border-[1.5px] border-indigo-200/40 rounded-xl rotate-20" />
        </div>
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-[60%] -right-5 w-35 h-35 border-[1.5px] border-indigo-200/30 rounded-xl rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-[#25324B] leading-[1.15] tracking-tight mb-4">
            Find Your
            <br />
            <span className="text-[#26A4FF] inline-block">
              Dream Job
              <svg className="w-full mt-1" viewBox="0 0 280 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C35 4 75 3 125 5C175 7 225 6 278 8" stroke="#26A4FF" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M5 13C45 6 95 4 145 6C195 8 245 5 275 10" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#515B6F] max-w-lg leading-relaxed mb-8">
            Discover <span className="font-semibold text-[#25324B]">{pagination.total}</span> open positions from top companies and startups around the world.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 sm:p-5 max-w-3xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <svg className="w-5 h-5 text-gray-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Job title, keyword, or company"
                      className="w-full outline-none text-gray-800 placeholder-gray-400 text-[15px] bg-transparent"
                    />
                  </div>
                </div>

                {/* Search button */}
                <button type="submit" className="bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-8 py-3.5 rounded-md transition-colors whitespace-nowrap text-[15px] w-full sm:w-auto">
                  Search jobs
                </button>
              </div>
            </div>
          </form>

          {/* Popular tags */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-5">
            <span className="text-sm text-[#515B6F]">Popular :</span>
            {['UI Designer', 'Developer', 'Remote', 'Marketing'].map((tag) => (
              <button
                key={tag}
                onClick={() => { setSearchInput(tag); setSearch(tag); }}
                className="text-sm font-medium text-[#25324B] hover:text-[#4640DE] transition-colors"
              >
                {tag}{tag !== 'Marketing' ? ',' : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#F8F8FD] py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar filters */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="bg-white border border-gray-200 rounded-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-[#25324B] text-base">Filters</h2>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-sm text-[#4640DE] hover:underline font-medium">Clear all</button>
                  )}
                </div>

                {/* Job Type */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-[#7C8493] uppercase tracking-wider mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {JOB_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedType(selectedType === t ? '' : t)}
                        className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                          selectedType === t
                            ? 'bg-[#4640DE] text-white'
                            : 'text-[#515B6F] hover:bg-[#F8F8FD]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                          selectedType === t ? 'border-white bg-white/20' : 'border-[#D6DDEB]'
                        }`}>
                          {selectedType === t && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#D6DDEB] mb-6" />

                {/* Category */}
                <div>
                  <h3 className="text-xs font-semibold text-[#7C8493] uppercase tracking-wider mb-3">Category</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)}
                        className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                          selectedCategory === c
                            ? 'bg-[#4640DE] text-white'
                            : 'text-[#515B6F] hover:bg-[#F8F8FD]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                          selectedCategory === c ? 'border-white bg-white/20' : 'border-[#D6DDEB]'
                        }`}>
                          {selectedCategory === c && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Job listings */}
            <div className="flex-1 min-w-0">
              {/* Active filters bar (mobile) */}
              <div className="lg:hidden overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
                <div className="flex gap-2" style={{ width: 'max-content' }}>
                  {JOB_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(selectedType === t ? '' : t)}
                      className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium capitalize border transition-all ${
                        selectedType === t
                          ? 'bg-[#4640DE] text-white border-[#4640DE]'
                          : 'bg-white text-[#515B6F] border-[#D6DDEB]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results header */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#25324B]">
                    All <span className="text-[#26A4FF]">Jobs</span>
                  </h2>
                  <p className="text-sm text-[#7C8493] mt-1">
                    Showing {jobs.length} of {pagination.total} jobs
                  </p>
                </div>
                {hasFilters && (
                  <button onClick={clearFilters} className="hidden lg:flex items-center gap-2 text-sm text-[#4640DE] font-semibold hover:underline">
                    Clear filters
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {loading ? (
                /* Skeleton grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-md p-6 animate-pulse">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-200" />
                        <div className="h-7 bg-gray-200 rounded-full w-20" />
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded-full w-16" />
                        <div className="h-6 bg-gray-200 rounded-full w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                /* Empty state */
                <div className="bg-white border border-gray-200 rounded-md flex flex-col items-center justify-center py-20 text-center px-5">
                  <div className="w-16 h-16 rounded-full bg-[#4640DE]/10 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#25324B] text-lg mb-2">No jobs found</h3>
                  <p className="text-sm text-[#7C8493] max-w-sm mb-5">
                    We couldn&apos;t find any jobs matching your criteria. Try adjusting your search or filters.
                  </p>
                  {hasFilters && (
                    <button onClick={clearFilters} className="bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-6 py-2.5 rounded-md text-sm transition-colors">
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Desktop Grid */}
                  <div className="hidden lg:grid grid-cols-3 gap-6">
                    {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                  </div>

                  {/* Tablet Grid */}
                  <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
                    {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                  </div>

                  {/* Mobile List */}
                  <div className="sm:hidden flex flex-col gap-4">
                    {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                      <button
                        disabled={pagination.page <= 1}
                        onClick={() => fetchJobs(pagination.page - 1)}
                        className="w-10 h-10 rounded-md border border-[#D6DDEB] text-[#7C8493] hover:border-[#4640DE] hover:text-[#4640DE] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      {Array.from({ length: pagination.pages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => fetchJobs(i + 1)}
                          className={`w-10 h-10 rounded-md text-sm font-semibold transition-colors ${
                            pagination.page === i + 1
                              ? 'bg-[#4640DE] text-white'
                              : 'border border-[#D6DDEB] text-[#515B6F] hover:border-[#4640DE] hover:text-[#4640DE]'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        disabled={pagination.page >= pagination.pages}
                        onClick={() => fetchJobs(pagination.page + 1)}
                        className="w-10 h-10 rounded-md border border-[#D6DDEB] text-[#7C8493] hover:border-[#4640DE] hover:text-[#4640DE] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

