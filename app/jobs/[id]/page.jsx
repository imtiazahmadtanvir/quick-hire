'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function TypeBadge({ type }) {
  const colors = {
    'full-time': 'bg-green-100 text-green-700',
    'part-time': 'bg-blue-100 text-blue-700',
    remote: 'bg-purple-100 text-purple-700',
    contract: 'bg-orange-100 text-orange-700',
    internship: 'bg-pink-100 text-pink-700',
  };
  return (
    <span className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
      {type}
    </span>
  );
}

function ApplyModal({ job, onClose, onSuccess }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: job._id, coverLetter }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to apply');
      } else {
        onSuccess();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#25324B]">Apply for {job.title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">{job.company} &mdash; {job.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
              Cover Letter <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              maxLength={2000}
              placeholder="Tell the employer why you're a great fit for this role..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{coverLetter.length}/2000</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#4640DE] hover:bg-[#3530b8] disabled:bg-[#4640DE]/60 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try { return JSON.parse(stored); } catch { return null; }
  });
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setJob(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleApplyClick = () => {
    if (!user) return router.push('/login');
    if (user.role !== 'jobseeker') return;
    setShowModal(true);
  };

  const salary =
    job?.salaryMin && job?.salaryMax
      ? `$${job.salaryMin.toLocaleString()} – $${job.salaryMax.toLocaleString()} ${job.currency}`
      : job?.salaryMin
      ? `From $${job.salaryMin.toLocaleString()} ${job.currency}`
      : 'Not specified';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-18 max-w-5xl mx-auto px-5 py-12 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-18 flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-500 mb-6">This job may have been removed or is no longer active.</p>
          <Link href="/jobs" className="bg-[#4640DE] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#3530b8] transition-colors text-sm">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {showModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setApplied(true);
          }}
        />
      )}

      <div className="pt-18">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#4640DE] mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#4640DE]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#4640DE] font-bold text-xl">{job.company[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#25324B] mb-1">{job.title}</h1>
                    <p className="text-gray-500">{job.company} &bull; {job.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TypeBadge type={job.type} />
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{job.category}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-[#25324B] mb-3">Job Description</h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</div>
              </div>

              {/* Requirements */}
              {job.requirements?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-[#25324B] mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#4640DE] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Apply card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Salary</p>
                      <p className="text-sm font-semibold text-[#25324B]">{salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm font-semibold text-[#25324B]">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Applicants</p>
                      <p className="text-sm font-semibold text-[#25324B]">{job.applicantsCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Posted</p>
                      <p className="text-sm font-semibold text-[#25324B]">
                        {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {applied ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-semibold text-center">
                    ✓ Application Submitted!
                  </div>
                ) : !user ? (
                  <Link href="/login" className="block w-full text-center bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold py-3 rounded-lg text-sm transition-colors">
                    Login to Apply
                  </Link>
                ) : user.role === 'employer' ? (
                  <p className="text-center text-xs text-gray-400 py-2">Employer accounts cannot apply</p>
                ) : (
                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Company info */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-[#25324B] text-sm mb-3">About the Company</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#4640DE] font-bold">{job.company[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#25324B] text-sm">{job.company}</p>
                    <p className="text-xs text-gray-400">
                      Posted by {job.postedBy?.fullName || 'Employer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
