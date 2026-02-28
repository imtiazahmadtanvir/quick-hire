'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import CloudinaryUpload from '@/components/shared/CloudinaryUpload';

const JOB_TYPES = ['full-time', 'part-time', 'remote', 'contract', 'internship'];
const CATEGORIES = [
  'Technology', 'Design', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'HR', 'Other',
];

const EMPTY_FORM = {
  title: '', company: '', location: '', type: 'full-time',
  category: 'Technology', description: '', salaryMin: '', salaryMax: '',
  currency: 'USD', requirements: [''], companyLogo: '',
};

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
      {isActive ? 'Active' : 'Closed'}
    </span>
  );
}

function EditModal({ job, token, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: job.title, company: job.company, location: job.location,
    type: job.type, category: job.category, description: job.description,
    salaryMin: job.salaryMin || '', salaryMax: job.salaryMax || '',
    currency: job.currency || 'USD', requirements: job.requirements?.length ? job.requirements : [''],
    isActive: job.isActive, companyLogo: job.companyLogo || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setReq = (i, v) => {
    const reqs = [...form.requirements];
    reqs[i] = v;
    setForm({ ...form, requirements: reqs });
  };
  const addReq = () => setForm({ ...form, requirements: [...form.requirements, ''] });
  const removeReq = (i) => setForm({ ...form, requirements: form.requirements.filter((_, idx) => idx !== i) });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, requirements: form.requirements.filter(Boolean) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); } else { onSaved(data.data); }
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#25324B]">Edit Job</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Job Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <InputField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
            <InputField label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} required />
            <SelectField label="Job Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={JOB_TYPES} />
            <SelectField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATEGORIES} />
            <SelectField label="Status" value={form.isActive ? 'active' : 'closed'} onChange={(v) => setForm({ ...form, isActive: v === 'active' })} options={['active', 'closed']} />
            <InputField label="Min Salary" type="number" value={form.salaryMin} onChange={(v) => setForm({ ...form, salaryMin: v })} placeholder="e.g. 50000" />
            <InputField label="Max Salary" type="number" value={form.salaryMax} onChange={(v) => setForm({ ...form, salaryMax: v })} placeholder="e.g. 80000" />
          </div>
          <CloudinaryUpload
            label="Company Logo (optional)"
            onUpload={(url) => setForm({ ...form, companyLogo: url })}
            value={form.companyLogo}
            folder="quickhire/logos"
            type="image"
            accept="image/*"
          />
          <div>
            <label className="block text-sm font-semibold text-[#25324B] mb-1.5">Description <span className="text-red-500">*</span></label>
            <textarea rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#25324B] mb-2">Requirements</label>
            <div className="space-y-2">
              {form.requirements.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input value={r} onChange={(e) => setReq(i, e.target.value)} placeholder={`Requirement ${i + 1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent" />
                  {form.requirements.length > 1 && (
                    <button type="button" onClick={() => removeReq(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addReq} className="text-sm text-[#4640DE] hover:underline font-semibold">+ Add requirement</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-3 bg-[#4640DE] hover:bg-[#3530b8] disabled:bg-[#4640DE]/60 text-white font-semibold rounded-lg text-sm">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent bg-white"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent bg-white capitalize">
        {options.map((o) => <option key={o} value={o} className="capitalize">{o}</option>)}
      </select>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [tab, setTab] = useState('apps'); // 'apps' | 'jobs' | 'post'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');
  const [postSuccess, setPostSuccess] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (!storedUser || !storedToken) return router.push('/login');
    const u = JSON.parse(storedUser);
    if (u.role !== 'employer') return router.push('/');
    setUser(u);
    setToken(storedToken);
    setForm((f) => ({ ...f, company: u.fullName || '' }));
  }, [router]);

  const fetchMyData = useCallback(async () => {
    if (!token) return;
    setLoadingJobs(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`/api/jobs?mine=true&limit=100`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();

      if (jobsData.success) {
        setJobs(jobsData.data);
      }
      if (appsData.success) setApplications(appsData.data);
    } catch { /* ignore */ }
    finally { setLoadingJobs(false); }
  }, [token]);

  useEffect(() => {
    if (token && user) fetchMyData();
  }, [token, user, fetchMyData]);

  useEffect(() => {
    if ((tab === 'jobs' || tab === 'apps') && token && user) fetchMyData();
  }, [tab, token, user, fetchMyData]);

  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    setPostError('');
    setPostSuccess('');
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, requirements: form.requirements.filter(Boolean), salaryMin: form.salaryMin || undefined, salaryMax: form.salaryMax || undefined, companyLogo: form.companyLogo || '' }),
      });
      const data = await res.json();
      if (!res.ok) { setPostError(data.message); }
      else { setPostSuccess('Job posted successfully!'); setForm({ ...EMPTY_FORM, company: user?.fullName || '' }); }
    } catch { setPostError('Network error. Please try again.'); }
    finally { setPosting(false); }
  };

  const handleDelete = async (jobId) => {
    if (!confirm('Delete this job? All applications will also be removed.')) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch { /* ignore */ }
  };

  const setReq = (i, v) => {
    const reqs = [...form.requirements];
    reqs[i] = v;
    setForm({ ...form, requirements: reqs });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {editJob && (
        <EditModal
          job={editJob}
          token={token}
          onClose={() => setEditJob(null)}
          onSaved={(updated) => {
            setJobs((prev) => prev.map((j) => (j._id === updated._id ? updated : j)));
            setEditJob(null);
          }}
        />
      )}

      <div className="pt-18">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#25324B]">Employer Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user.fullName}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
            <StatCard label="Jobs Posted" value={jobs.length} color="text-[#4640DE]" />
            <StatCard label="Active Jobs" value={jobs.filter((j) => j.isActive).length} color="text-green-600" />
            <StatCard label="Applications" value={applications.length} color="text-[#26A4FF]" />
            <StatCard label="Pending" value={applications.filter((a) => a.status === 'pending').length} color="text-orange-500" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
            {[{ key: 'apps', label: 'Applications' }, { key: 'jobs', label: 'My Jobs' }, { key: 'post', label: '+ Post a Job' }].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setTab(key); if (key === 'jobs' || key === 'apps') fetchMyData(); }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === key ? 'bg-white text-[#4640DE] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Applications */}
          {tab === 'apps' && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-[#25324B]">Applications Received</h2>
              </div>
              {loadingJobs ? (
                <div className="p-8 text-center text-gray-400 text-sm">Loading applications...</div>
              ) : applications.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No applications received yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase">Applicant</th>
                        <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase">Job</th>
                        <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase hidden sm:table-cell">Applied On</th>
                        <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase">Cover Note</th>
                        <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase">Resume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {applications.map((app) => (
                        <tr key={app._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-[#25324B]">{app.applicantName || app.applicant?.fullName}</p>
                            <p className="text-xs text-gray-400">{app.applicantEmail || app.applicant?.email}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-medium text-gray-700">{app.job?.title}</p>
                            <p className="text-xs text-gray-400">{app.job?.company}</p>
                          </td>
                          <td className="px-4 py-4">
                            <ApplicationStatusBadge status={app.status} appId={app._id} token={token} onUpdate={(id, s) => setApplications((prev) => prev.map((a) => a._id === id ? { ...a, status: s } : a))} />
                          </td>
                          <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">
                            {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-4 text-gray-500 text-xs max-w-45">
                            {app.coverLetter ? (
                              <span className="truncate block" title={app.coverLetter}>{app.coverLetter.slice(0, 60)}{app.coverLetter.length > 60 ? '...' : ''}</span>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-4 text-xs">
                            {(app.resumeLink || app.resume) ? (
                              <a href={app.resumeLink || app.resume} target="_blank" rel="noopener noreferrer" className="text-[#4640DE] hover:underline font-medium">View</a>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Post a Job */}
          {tab === 'post' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#25324B] mb-5">Post a New Job</h2>
              {postSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-5 flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>{postSuccess}</div>}
              {postError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">{postError}</div>}

              <form onSubmit={handlePost} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Job Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                  <InputField label="Company Name" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
                  <InputField label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="e.g. New York, NY or Remote" required />
                  <SelectField label="Job Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={JOB_TYPES} />
                  <SelectField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATEGORIES} />
                  <SelectField label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v })} options={['USD', 'EUR', 'GBP', 'PKR', 'INR']} />
                  <InputField label="Min Salary" type="number" value={form.salaryMin} onChange={(v) => setForm({ ...form, salaryMin: v })} placeholder="e.g. 50000" />
                  <InputField label="Max Salary" type="number" value={form.salaryMax} onChange={(v) => setForm({ ...form, salaryMax: v })} placeholder="e.g. 80000" />
                </div>

                <CloudinaryUpload
                  label="Company Logo (optional)"
                  onUpload={(url) => setForm({ ...form, companyLogo: url })}
                  value={form.companyLogo}
                  folder="quickhire/logos"
                  type="image"
                  accept="image/*"
                />

                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and what makes it great..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Requirements</label>
                  <div className="space-y-2">
                    {form.requirements.map((r, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={r} onChange={(e) => setReq(i, e.target.value)} placeholder={`Requirement ${i + 1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent" />
                        {form.requirements.length > 1 && (
                          <button type="button" onClick={() => setForm({ ...form, requirements: form.requirements.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-semibold px-2">✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setForm({ ...form, requirements: [...form.requirements, ''] })} className="text-sm text-[#4640DE] hover:underline font-semibold">
                      + Add requirement
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={posting} className="w-full sm:w-auto bg-[#4640DE] hover:bg-[#3530b8] disabled:bg-[#4640DE]/60 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors">
                  {posting ? 'Posting...' : 'Post Job'}
                </button>
              </form>
            </div>
          )}

          {/* My Jobs */}
          {tab === 'jobs' && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-[#25324B]">My Posted Jobs</h2>
                <button onClick={() => setTab('post')} className="text-sm text-[#4640DE] font-semibold hover:underline">+ Post New</button>
              </div>
              {loadingJobs ? (
                <div className="p-8 text-center text-gray-400 text-sm">Loading jobs...</div>
              ) : jobs.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 mb-3">You haven&apos;t posted any jobs yet</p>
                  <button onClick={() => setTab('post')} className="bg-[#4640DE] text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-[#3530b8] transition-colors">Post Your First Job</button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {jobs.map((job) => {
                    const jobApplicants = applications.filter((a) => a.job?._id === job._id || a.job === job._id);
                    const isExpanded = expandedJobId === job._id;
                    return (
                      <div key={job._id}>
                        {/* Job row */}
                        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 transition-colors">
                          {/* Logo + title */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-[#4640DE]/10 flex items-center justify-center shrink-0 overflow-hidden">
                              {job.companyLogo ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <span className="text-[#4640DE] font-bold text-sm">{job.company?.[0]?.toUpperCase()}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-[#25324B] truncate">{job.title}</p>
                              <p className="text-xs text-gray-400">{job.company} &middot; {job.location}</p>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="text-xs font-semibold capitalize text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{job.type}</span>
                            <StatusBadge isActive={job.isActive} />

                            {/* Applicants toggle */}
                            <button
                              onClick={() => setExpandedJobId(isExpanded ? null : job._id)}
                              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                                isExpanded
                                  ? 'bg-[#4640DE] text-white border-[#4640DE]'
                                  : 'bg-[#4640DE]/5 text-[#4640DE] border-[#4640DE]/20 hover:bg-[#4640DE]/10'
                              }`}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {jobApplicants.length} Applicant{jobApplicants.length !== 1 ? 's' : ''}
                              <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Link href={`/jobs/${job._id}`} className="text-xs text-gray-500 hover:text-[#4640DE] font-medium" target="_blank">View</Link>
                              <span className="text-gray-200">|</span>
                              <button onClick={() => setEditJob(job)} className="text-xs text-[#4640DE] hover:underline font-medium">Edit</button>
                              <span className="text-gray-200">|</span>
                              <button onClick={() => handleDelete(job._id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded applicants panel */}
                        {isExpanded && (
                          <div className="bg-[#F8F8FD] border-t border-[#4640DE]/10 px-6 py-5">
                            <h3 className="text-sm font-bold text-[#25324B] mb-4 flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Applicants for &ldquo;{job.title}&rdquo;
                            </h3>

                            {jobApplicants.length === 0 ? (
                              <div className="text-center py-8 text-gray-400 text-sm">
                                <svg className="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                No applications yet for this job
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {jobApplicants.map((app) => (
                                  <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                                    {/* Applicant header */}
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#4640DE]/10 flex items-center justify-center shrink-0">
                                          <span className="text-[#4640DE] font-bold text-sm">
                                            {(app.applicantName || app.applicant?.fullName)?.[0]?.toUpperCase() || '?'}
                                          </span>
                                        </div>
                                        <div>
                                          <p className="font-semibold text-[#25324B] text-sm">{app.applicantName || app.applicant?.fullName}</p>
                                          <p className="text-xs text-gray-400">{app.applicantEmail || app.applicant?.email}</p>
                                        </div>
                                      </div>
                                      <ApplicationStatusBadge
                                        status={app.status}
                                        appId={app._id}
                                        token={token}
                                        onUpdate={(id, s) => setApplications((prev) => prev.map((a) => a._id === id ? { ...a, status: s } : a))}
                                      />
                                    </div>

                                    {/* Applied date */}
                                    <p className="text-xs text-gray-400">
                                      Applied {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>

                                    {/* Cover letter preview */}
                                    {app.coverLetter && (
                                      <div className="bg-gray-50 rounded-lg px-3 py-2">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Cover Note</p>
                                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{app.coverLetter}</p>
                                      </div>
                                    )}

                                    {/* Resume link */}
                                    {(app.resumeLink || app.resume) && (
                                      <a
                                        href={app.resumeLink || app.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-semibold text-[#4640DE] hover:underline"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        View Resume
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function ApplicationStatusBadge({ status, appId, token, onUpdate }) {
  const [updating, setUpdating] = useState(false);
  const options = ['pending', 'reviewed', 'accepted', 'rejected'];
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const handleChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) onUpdate(appId, newStatus);
    } catch { /* ignore */ }
    finally { setUpdating(false); }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={updating}
      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4640DE] ${colors[status]}`}
    >
      {options.map((o) => <option key={o} value={o} className="bg-white text-gray-700 capitalize">{o}</option>)}
    </select>
  );
}

