'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Epilogue, Red_Hat_Display } from 'next/font/google';
import CloudinaryUpload from '@/components/shared/CloudinaryUpload';

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

export default function CreateJobPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    category: 'Technology',
    description: '',
    requirements: '',
    salary: '',
    companyLogo: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== 'employer') {
        router.push('/');
        return;
      }

      setUser(userData);
    };

    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Parse requirements from textarea (split by newline)
      const requirementsArray = form.requirements
        .split('\n')
        .map((req) => req.trim())
        .filter((req) => req);

      const jobData = {
        title: form.title,
        company: form.company,
        location: form.location,
        type: form.type,
        category: form.category,
        description: form.description,
        requirements: requirementsArray,
        salary: form.salary,
        companyLogo: form.companyLogo,
      };

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to create job');
        setLoading(false);
        return;
      }

      toast.success('Job created successfully!');
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } catch (error) {
      toast.error('Network error. Please try again.');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={`${epilogue.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${epilogue.className} min-h-screen bg-gray-50 py-12 px-5 sm:px-10`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-[#4640DE] font-semibold hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#25324B] mb-2">Post a New Job</h1>
          <p className="text-gray-500">Fill in the details to create a new job posting</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#25324B] mb-2">
              Job Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Senior React Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-[#25324B] mb-2">
              Company Name *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={form.company}
              onChange={handleChange}
              placeholder="e.g., Tech Corp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-[#25324B] mb-2">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
            />
          </div>

          {/* Job Type and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-[#25324B] mb-2">
                Job Type *
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Temporary</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-[#25324B] mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Business</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>
            </div>
          </div>

          {/* Company Logo */}
          <CloudinaryUpload
            label="Company Logo (optional)"
            onUpload={(url) => setForm({ ...form, companyLogo: url })}
            value={form.companyLogo}
            folder="quickhire/logos"
            type="image"
            accept="image/*"
          />

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#25324B] mb-2">
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the job role, responsibilities, and what success looks like..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] resize-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-semibold text-[#25324B] mb-2">
              Requirements *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              required
              value={form.requirements}
              onChange={handleChange}
              placeholder="Enter each requirement on a new line&#10;e.g.,&#10;5+ years of React experience&#10;Strong JavaScript knowledge&#10;Experience with REST APIs"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE] resize-none"
            />
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-semibold text-[#25324B] mb-2">
              Salary Range (Optional)
            </label>
            <input
              id="salary"
              name="salary"
              type="text"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g., $80,000 - $120,000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#4640DE] text-white font-semibold py-3 rounded-lg hover:bg-[#3a35c9] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Job...' : 'Post Job'}
            </button>
            <Link
              href="/admin"
              className="flex-1 border border-gray-300 text-[#25324B] font-semibold py-3 rounded-lg hover:bg-gray-50 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
