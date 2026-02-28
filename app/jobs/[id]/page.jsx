'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Epilogue } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CloudinaryUpload from '@/components/shared/CloudinaryUpload';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const tagStyles = {
  'full-time': 'bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20',
  'part-time': 'bg-[#26A4FF]/10 text-[#26A4FF] border border-[#26A4FF]/20',
  remote: 'bg-[#4640DE]/10 text-[#4640DE] border border-[#4640DE]/20',
  contract: 'bg-[#FFB836]/10 text-[#FFB836] border border-[#FFB836]/20',
  internship: 'bg-[#FF6550]/10 text-[#FF6550] border border-[#FF6550]/20',
};

function TypeBadge({ type }) {
  return (
    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${tagStyles[type] || 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
      {type}
    </span>
  );
}

function ApplyModal({ job, onClose, onSuccess }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');
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
        body: JSON.stringify({ jobId: job._id, coverLetter, resume }),
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
      <div className="bg-white rounded-md w-full max-w-lg shadow-2xl border border-gray-200">
        <div className="p-6 border-b border-[#D6DDEB]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#25324B]">Apply for {job.title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F8FD] transition-colors">
              <svg className="w-5 h-5 text-[#7C8493]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-[#515B6F] mt-1">{job.company} &mdash; {job.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-[#FF6550]/10 border border-[#FF6550]/20 text-[#FF6550] px-4 py-3 rounded-md text-sm font-medium">{error}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#25324B] mb-2">
              Cover Letter <span className="text-[#7C8493] font-normal">(optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              maxLength={2000}
              placeholder="Tell the employer why you're a great fit for this role..."
              className="w-full px-4 py-3 border border-[#D6DDEB] rounded-md text-sm text-[#25324B] placeholder-[#A8ADB7] focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent resize-none"
            />
            <p className="text-xs text-[#A8ADB7] text-right mt-1">{coverLetter.length}/2000</p>
          </div>

          <CloudinaryUpload
            label="Resume / CV (optional)"
            onUpload={(url) => setResume(url)}
            value={resume}
            folder="quickhire/resumes"
            type="file"
            accept=".pdf,.doc,.docx"
          />

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#D6DDEB] rounded-md text-sm font-semibold text-[#515B6F] hover:bg-[#F8F8FD] transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#4640DE] hover:bg-[#3530b8] disabled:bg-[#4640DE]/60 text-white font-semibold rounded-md text-sm transition-colors"
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
      : job?.salary || 'Not specified';

  if (loading) {
    return (
      <div className={`${epilogue.className} min-h-screen bg-white`}>
        <Navbar />
        <div className="pt-18">
          <div className="bg-linear-to-br from-white via-white to-indigo-50/40 py-14">
            <div className="max-w-5xl mx-auto px-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-28 mb-6" />
              <div className="flex items-start gap-5 mb-4">
                <div className="w-16 h-16 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-3 pt-1">
                  <div className="h-7 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-5 py-10 animate-pulse space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={`${epilogue.className} min-h-screen bg-white`}>
        <Navbar />
        <div className="pt-18 flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
          <div className="w-16 h-16 rounded-full bg-[#4640DE]/10 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#25324B] mb-2">Job not found</h2>
          <p className="text-[#7C8493] mb-6 max-w-sm">This job may have been removed or is no longer active.</p>
          <Link href="/jobs" className="bg-[#4640DE] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#3530b8] transition-colors text-sm">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${epilogue.className} min-h-screen bg-white`}>
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

      {/* Hero-style header */}
      <div className="relative pt-18 overflow-hidden bg-linear-to-br from-white via-white to-indigo-50/40">
        {/* Decorative shapes */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-60 h-60 border-[1.5px] border-indigo-200/50 rounded-xl rotate-12" />
          <div className="absolute top-[60%] right-[5%] w-40 h-40 border-[1.5px] border-indigo-200/35 rounded-xl -rotate-6" />
          <div className="absolute bottom-4 right-[20%] w-50 h-50 border-[1.5px] border-indigo-200/40 rounded-xl rotate-20" />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
          {/* Back link */}
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-[#7C8493] hover:text-[#4640DE] mb-8 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Jobs
          </Link>

          {/* Job header */}
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0 overflow-hidden">
              {job.companyLogo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-[#4640DE] font-bold text-2xl">{job.company?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#25324B] leading-tight mb-2">
                {job.title}
              </h1>
              <p className="text-base text-[#515B6F]">
                {job.company}
                <span className="mx-2 text-[#D6DDEB]">•</span>
                {job.location}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <TypeBadge type={job.type} />
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-transparent text-[#25324B] border border-[#25324B]/30">
                  {job.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content body */}
      <section className="bg-[#F8F8FD] py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white border border-gray-200 rounded-md p-6 lg:p-8">
                <h2 className="text-xl font-bold text-[#25324B] mb-4">Job Description</h2>
                <div className="text-[15px] text-[#515B6F] leading-[1.8] whitespace-pre-wrap">{job.description}</div>
              </div>

              {/* Requirements */}
              {job.requirements?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-md p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-[#25324B] mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-[#515B6F] leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-[#4640DE]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Apply card */}
              <div className="bg-white border border-gray-200 rounded-md p-6">
                <div className="space-y-4 mb-6">
                  {/* Salary */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#56CDAD]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#56CDAD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#7C8493] font-medium uppercase tracking-wide">Salary</p>
                      <p className="text-sm font-bold text-[#25324B]">{salary}</p>
                    </div>
                  </div>

                  <div className="h-px bg-[#D6DDEB]" />

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#26A4FF]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#26A4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#7C8493] font-medium uppercase tracking-wide">Location</p>
                      <p className="text-sm font-bold text-[#25324B]">{job.location}</p>
                    </div>
                  </div>

                  <div className="h-px bg-[#D6DDEB]" />

                  {/* Applicants */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FFB836]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#FFB836]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#7C8493] font-medium uppercase tracking-wide">Applicants</p>
                      <p className="text-sm font-bold text-[#25324B]">{job.applicantsCount}</p>
                    </div>
                  </div>

                  <div className="h-px bg-[#D6DDEB]" />

                  {/* Posted date */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#4640DE]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#7C8493] font-medium uppercase tracking-wide">Posted</p>
                      <p className="text-sm font-bold text-[#25324B]">
                        {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {applied ? (
                  <div className="bg-[#56CDAD]/10 border border-[#56CDAD]/20 text-[#56CDAD] px-4 py-3.5 rounded-md text-sm font-bold text-center">
                    ✓ Application Submitted!
                  </div>
                ) : !user ? (
                  <Link href="/login" className="block w-full text-center bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold py-3.5 rounded-md text-sm transition-colors">
                    Login to Apply
                  </Link>
                ) : user.role === 'employer' ? (
                  <p className="text-center text-xs text-[#7C8493] py-2">Employer accounts cannot apply</p>
                ) : (
                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-[#4640DE] hover:bg-[#3530b8] text-white font-semibold py-3.5 rounded-md text-sm transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Company info */}
              <div className="bg-white border border-gray-200 rounded-md p-6">
                <h3 className="font-bold text-[#25324B] text-base mb-4">About the Company</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {job.companyLogo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-[#4640DE] font-bold text-lg">{job.company?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#25324B] text-sm">{job.company}</p>
                    <p className="text-xs text-[#7C8493]">
                      Posted by {job.postedBy?.fullName || 'Employer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
