'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Epilogue, Red_Hat_Display } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

export default function CompaniesPage() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const res = await fetch('/api/employers');
        const data = await res.json();

        if (res.ok) {
          setEmployers(data.employers || []);
        }
      } catch (error) {
        console.error('Failed to fetch employers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const filteredEmployers = employers.filter((employer) =>
    employer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employer.companies.some((company) => company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`${epilogue.className} min-h-screen bg-gray-50`}>
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-200 pt-24 pb-12 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className={`${redHat.className} text-4xl sm:text-5xl font-extrabold text-[#25324B] mb-4`}>
            Top Companies
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Browse and discover top employers posting the latest job opportunities
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white border-b border-gray-200 py-6 px-5 sm:px-10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search companies or employers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
          />
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500 text-lg">Loading companies...</p>
            </div>
          ) : filteredEmployers.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No companies found matching your search' : 'No companies available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployers.map((employer) => (
                <div
                  key={employer._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-linear-to-r from-[#4640DE] to-[#3a35c9] h-20"></div>

                  {/* Content */}
                  <div className="p-6 -mt-10 relative z-10">
                    {/* Avatar Circle */}
                    <div className="w-16 h-16 bg-white border-4 border-[#4640DE] rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
                      <div className="w-14 h-14 bg-linear-to-br from-[#4640DE] to-[#26A4FF] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {employer.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Employer Name */}
                    <h3 className="text-lg font-bold text-[#25324B] text-center mb-2">
                      {employer.fullName}
                    </h3>

                    {/* Companies */}
                    {employer.companies.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Companies</p>
                        <div className="flex flex-wrap gap-2">
                          {employer.companies.slice(0, 2).map((company, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-blue-50 text-[#4640DE] text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                            >
                              {company}
                            </span>
                          ))}
                          {employer.companies.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                              +{employer.companies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Job Count */}
                    <div className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 rounded-lg mb-4">
                      <span className="text-xl font-bold text-[#4640DE]">{employer.jobCount}</span>
                      <span className="text-sm text-gray-600">
                        {employer.jobCount === 1 ? 'Job Posted' : 'Jobs Posted'}
                      </span>
                    </div>

                    {/* Email */}
                    <p className="text-sm text-gray-600 text-center mb-4 truncate" title={employer.email}>
                      {employer.email}
                    </p>

                    {/* Joined Date */}
                    <p className="text-xs text-gray-500 text-center mb-4">
                      Joined{' '}
                      {new Date(employer.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </p>

                    {/* View Jobs Button */}
                    <Link
                      href={`/jobs?employer=${employer._id}`}
                      className="block w-full text-center bg-[#4640DE] text-white font-semibold py-2.5 rounded-lg hover:bg-[#3a35c9] transition"
                    >
                      View Jobs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!loading && employers.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-12 px-5 sm:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#4640DE]">{employers.length}</p>
              <p className="text-gray-600">Active Employers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#26A4FF]">
                {employers.reduce((sum, emp) => sum + emp.jobCount, 0)}
              </p>
              <p className="text-gray-600">Total Job Postings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#56CDAD]">
                {new Set(employers.flatMap((emp) => emp.companies)).size}
              </p>
              <p className="text-gray-600">Companies Hiring</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
