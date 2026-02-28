'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-700 border-blue-200',
  accepted: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_ICONS = {
  pending: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  reviewed: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  accepted: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  rejected: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function StatCard({ label, value, color, sublabel }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (!storedUser || !storedToken) return router.push('/login');
    const u = JSON.parse(storedUser);
    if (u.role !== 'jobseeker') return router.push('/admin');
    setUser(u);
  }, [router]);

  const fetchApplications = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setApplications(data.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (user) fetchApplications();
  }, [user, fetchApplications]);

  const filtered = filter === 'all' ? applications : applications.filter((a) => a.status === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-18">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-2xl font-bold text-[#25324B]">My Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome back, {user.fullName}</p>
            </div>
            <Link
              href="/jobs"
              className="bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors hidden sm:block"
            >
              Browse Jobs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
            <StatCard label="Total Applied" value={stats.total} color="text-[#4640DE]" />
            <StatCard label="Pending" value={stats.pending} color="text-yellow-600" sublabel="Awaiting response" />
            <StatCard label="Accepted" value={stats.accepted} color="text-green-600" sublabel="Congratulations!" />
            <StatCard label="Rejected" value={stats.rejected} color="text-red-500" />
          </div>

          {/* Applications list */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-[#25324B]">My Applications</h2>
              {/* Filter buttons */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${filter === f ? 'bg-white text-[#4640DE] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {f === 'all' ? `All (${stats.total})` : f}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-8">
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                      <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 flex flex-col items-center text-center px-5">
                <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                {filter === 'all' ? (
                  <>
                    <p className="text-gray-500 font-semibold mb-1">No applications yet</p>
                    <p className="text-sm text-gray-400 mb-5">Start exploring jobs and apply to positions that match your skills</p>
                    <Link href="/jobs" className="bg-[#4640DE] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#3530b8] transition-colors">
                      Browse Jobs
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-500">No {filter} applications</p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filtered.map((app) => (
                  <div key={app._id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    {/* Company icon */}
                    <div className="w-10 h-10 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#4640DE] font-bold text-sm">
                        {app.job?.company?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>

                    {/* Job info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/jobs/${app.job?._id}`}
                        className="font-semibold text-[#25324B] hover:text-[#4640DE] transition-colors truncate block text-sm"
                      >
                        {app.job?.title || 'Job removed'}
                      </Link>
                      <p className="text-xs text-gray-500 truncate">
                        {app.job?.company}
                        {app.job?.location && ` · ${app.job.location}`}
                        {app.job?.type && (
                          <span className="ml-1 capitalize"> · {app.job.type}</span>
                        )}
                      </p>
                    </div>

                    {/* Date applied */}
                    <p className="text-xs text-gray-400 shrink-0 hidden sm:block">
                      {new Date(app.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>

                    {/* Status */}
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 ${STATUS_COLORS[app.status]}`}>
                      {STATUS_ICONS[app.status]}
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile section */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-[#25324B] mb-3 text-sm">Account</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#4640DE]/10 flex items-center justify-center shrink-0">
                <span className="text-[#4640DE] font-bold text-lg">{user.fullName?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#25324B]">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="inline-block text-xs font-semibold text-[#4640DE] bg-[#4640DE]/10 px-2 py-0.5 rounded mt-1 capitalize">
                  {user.role}
                </span>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/');
                }}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
