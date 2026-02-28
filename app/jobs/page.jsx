'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const JOB_TYPES = ['full-time', 'part-time', 'remote', 'contract', 'internship'];
const CATEGORIES = [
  'Technology', 'Design', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'HR', 'Other',
];

function TypeBadge({ type }) {
  const colors = {
    'full-time': 'bg-green-100 text-green-700',
    'part-time': 'bg-blue-100 text-blue-700',
    remote: 'bg-purple-100 text-purple-700',
    contract: 'bg-orange-100 text-orange-700',
    internship: 'bg-pink-100 text-pink-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
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
      : null;

  return (
    <Link href={`/jobs/${job._id}`} className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#4640DE]/40 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-11 h-11 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0">
          <span className="text-[#4640DE] font-bold text-base">{job.company[0]?.toUpperCase()}</span>
        </div>
        <TypeBadge type={job.type} />
      </div>
      <h3 className="font-semibold text-[#25324B] text-base group-hover:text-[#4640DE] transition-colors mb-1 truncate">
        {job.title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{job.company}</p>
      <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {job.location}
        </span>
        {salary && (
          <span className="flex items-center gap-1 text-[#4640DE] font-medium">
            {salary}
          </span>
        )}
        <span className="text-gray-300">&bull;</span>
        <span>{job.category}</span>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-xs text-gray-400">{job.applicantsCount} applicant{job.applicantsCount !== 1 ? 's' : ''}</span>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-18">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-[#25324B] mb-2">Find Your Dream Job</h1>
          <p className="text-gray-500 mb-6">Discover {pagination.total} open positions</p>
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search jobs, companies..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent bg-white"
              />
            </div>
            <button type="submit" className="bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#25324B] text-sm">Filters</h2>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-[#4640DE] hover:underline">Clear all</button>
                )}
              </div>

              {/* Job Type */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Job Type</h3>
                <div className="space-y-1.5">
                  {JOB_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(selectedType === t ? '' : t)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                        selectedType === t ? 'bg-[#4640DE] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === c ? 'bg-[#4640DE] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job listings */}
          <div className="flex-1 min-w-0">
            {/* Mobile filters */}
            <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-1">
              {JOB_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(selectedType === t ? '' : t)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                    selectedType === t ? 'bg-[#4640DE] text-white border-[#4640DE]' : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                    <div className="flex gap-3 mb-3">
                      <div className="w-11 h-11 rounded-lg bg-gray-200" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-20 text-center px-5">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <h3 className="font-semibold text-gray-900 mb-1">No jobs found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-sm text-[#4640DE] font-semibold hover:underline">Clear filters</button>
                )}
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing <span className="font-semibold text-gray-900">{jobs.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{pagination.total}</span> jobs
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pagination.pages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => fetchJobs(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                          pagination.page === i + 1
                            ? 'bg-[#4640DE] text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#4640DE]'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

