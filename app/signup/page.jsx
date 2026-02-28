'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    profileImage: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      const msg = 'Passwords do not match';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: form.role,
          profileImage: form.profileImage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.message || 'Something went wrong';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      toast.success('Account created successfully! Redirecting to login...');
      
      // Store token temporarily (will be cleared on login redirect)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to login page after short delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      const errorMsg = 'Network error. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className={`${epilogue.className} min-h-screen flex`}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#4640DE] relative flex-col justify-center items-center px-12">
        {/* Decorative diagonal */}
        <svg className="absolute top-0 right-0 w-40 h-full" viewBox="0 0 160 800" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 160,0 160,800 80,800" fill="#3a35c9" opacity="0.3" />
        </svg>

        <div className="relative z-10 text-center max-w-md">
          <Link href="/" className="flex items-center gap-3 justify-center mb-10">
            <Image src="/quickhire-logo.png" alt="QuickHire" width={48} height={48} />
            <span className={`${redHat.className} text-3xl font-extrabold text-white`}>QuickHire</span>
          </Link>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Start your journey<br />with us today
          </h2>
          <p className="text-white/70 text-lg">
            Discover thousands of job opportunities or find the perfect candidate for your team.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-10 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Image src="/quickhire-logo.png" alt="QuickHire" width={32} height={32} />
            <span className={`${redHat.className} text-xl font-extrabold text-gray-900`}>QuickHire</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#25324B] mb-2">Create an Account</h1>
          <p className="text-gray-500 mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4640DE] font-semibold hover:underline">
              Log In
            </Link>
          </p>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#25324B] mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#25324B] mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#25324B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password (min. 6 characters)"
                  className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#25324B] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 pr-11 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent transition ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                  aria-label="Toggle confirm password visibility"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Profile Image */}
            <CloudinaryUpload
              label="Profile Photo (optional)"
              onUpload={(url) => setForm({ ...form, profileImage: url })}
              value={form.profileImage}
              folder="quickhire/profiles"
              type="image"
              accept="image/*"
            />

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-[#25324B] mb-2">
                I want to
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'jobseeker' })}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold border-2 transition-colors ${
                    form.role === 'jobseeker'
                      ? 'border-[#4640DE] bg-[#4640DE]/5 text-[#4640DE]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  Find a Job
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'employer' })}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold border-2 transition-colors ${
                    form.role === 'employer'
                      ? 'border-[#4640DE] bg-[#4640DE]/5 text-[#4640DE]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  Hire Talent
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4640DE] hover:bg-[#3530b8] disabled:bg-[#4640DE]/60 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
