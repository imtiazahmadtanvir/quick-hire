import Link from 'next/link';
import Image from 'next/image';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

/* ── stat cards ── */
function StatCard({ number, label, color }) {
  const colors = {
    purple: 'bg-[#4640DE]',
    green: 'bg-[#56CDAD]',
    blue: 'bg-[#26A4FF]',
  };
  return (
    <div className={`${colors[color]} rounded-lg  px-3 py-2.5 lg:px-4 lg:py-3 flex items-center justify-between gap-2 flex-1 min-w-0`}>
      <div className="min-w-0">
        <span className="text-white font-bold text-base lg:text-xl leading-none">{number}</span>
        <p className="text-white/80 text-[9px] lg:text-[10px] mt-0.5 leading-tight truncate">{label}</p>
      </div>
      <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

/* ── bar chart column ── */
function BarRow({ day, view, applied, maxVal = 140 }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex gap-0.5 items-end h-16 lg:h-24">
        <div className="w-3 lg:w-5 rounded-t bg-[#FFB836]" style={{ height: `${(view / maxVal) * 100}%` }} />
        <div className="w-3 lg:w-5 rounded-t bg-[#4640DE]" style={{ height: `${(applied / maxVal) * 100}%` }} />
      </div>
      <span className="text-[8px] lg:text-[10px] text-gray-400 mt-1">{day}</span>
    </div>
  );
}

/* ── sidebar nav item ── */
function SidebarItem({ label, active, badge, icon }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] lg:text-xs cursor-pointer ${active ? 'bg-indigo-50 text-[#4640DE] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
      {icon}
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto p-6 w-4 h-4 rounded-full bg-[#4640DE] text-white text-[8px] flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}

/* ── sidebar icons ── */
const icons = {
  dashboard: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
    </svg>
  ),
  messages: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  company: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  applicants: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  listing: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  schedule: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  settings: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1.066.426 2.573.066 2.573-1.066z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  help: (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function CTABanner() {
  return (
    <section className={`${epilogue.className} relative overflow-hidden bg-[#4640DE]`}>
      {/* Diagonal white triangle top-left */}
      <div className="absolute top-0 left-0 z-10">
        <div className="w-0 h-0 border-l-160 sm:border-l-240 lg:border-l-300 border-l-white border-b-160 sm:border-b-240 lg:border-b-300 border-b-transparent" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ─── Desktop Layout ─── */}
        <div className="hidden lg:grid grid-cols-[0.9fr_1.1fr] gap-12 items-center py-20 xl:py-24">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="text-white/80 text-lg">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#4640DE] font-bold text-base px-8 py-3.5 hover:bg-gray-100 transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Right: Dashboard */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 w-32 shrink-0">
                    <Image src="/quickhire-logo.png" alt="Logo" width={18} height={18} />
                    <span className="font-bold text-[11px] text-gray-900">QuickHire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 leading-none">Company</p>
                      <p className="text-xs font-semibold text-gray-900 flex items-center gap-0.5">
                        Nomad
                        <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <button className="bg-[#4640DE] text-white text-[10px] font-semibold px-3 py-1.5 rounded flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Post a job
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex">
                {/* Sidebar */}
                <div className="flex flex-col w-32 xl:w-36 border-r border-gray-100 py-3 px-2 shrink-0">
                  <SidebarItem label="Dashboard" active icon={icons.dashboard} />
                  <SidebarItem label="Messages" badge="1" icon={icons.messages} />
                  <SidebarItem label="Company Profile" icon={icons.company} />
                  <SidebarItem label="All Applicants" icon={icons.applicants} />
                  <SidebarItem label="Job Listing" icon={icons.listing} />
                  <SidebarItem label="My Schedule" icon={icons.schedule} />
                  <div className="mt-4 pt-3 border-t border-gray-100 px-2">
                    <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-2">Settings</p>
                    <SidebarItem label="Settings" icon={icons.settings} />
                    <SidebarItem label="Help Center" icon={icons.help} />
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex">
                    {/* Center */}
                    <div className="flex-1 p-3 xl:p-4 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-xs xl:text-sm text-gray-900">Good morning, Maria</h3>
                          <p className="text-[9px] xl:text-[10px] text-gray-400 mt-0.5 truncate">Here is your job listings statistic report from July 19 - July 25.</p>
                        </div>
                        <span className="text-[9px] xl:text-[10px] text-gray-500 border border-gray-200 rounded px-2 py-1 flex items-center gap-1 shrink-0 ml-2">
                          Jul 19 - Jul 25
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                      </div>

                      {/* Stat cards */}
                      <div className="flex gap-2 mb-3">
                        <StatCard number="76" label="New candidates to review" color="purple" />
                        <StatCard number="3" label="Schedule for today" color="green" />
                        <StatCard number="24" label="Messages received" color="blue" />
                      </div>

                      {/* Chart row */}
                      <div className="flex gap-2">
                        {/* Chart */}
                        <div className="flex-1 border border-gray-100 rounded-lg p-2.5 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h4 className="font-bold text-[10px] xl:text-xs text-gray-900">Job statistics</h4>
                              <p className="text-[8px] text-gray-400">Showing Jobstatistic Jul 19-25</p>
                            </div>
                            <div className="flex border border-gray-200 rounded overflow-hidden text-[8px]">
                              <span className="px-1.5 py-0.5 text-gray-400">Week</span>
                              <span className="px-1.5 py-0.5 bg-[#4640DE] text-white">Month</span>
                              <span className="px-1.5 py-0.5 text-gray-400">Year</span>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-2 border-b border-gray-100 pb-1.5">
                            <span className="text-[9px] font-semibold text-gray-900 border-b-2 border-[#4640DE] pb-1">Overview</span>
                            <span className="text-[9px] text-gray-400">Jobs View</span>
                            <span className="text-[9px] text-gray-400">Jobs Applied</span>
                          </div>
                          <div className="flex items-end justify-between gap-1">
                            <BarRow day="Mon" view={60} applied={30} />
                            <BarRow day="Tue" view={40} applied={50} />
                            <BarRow day="Wed" view={90} applied={70} />
                            <BarRow day="Thu" view={120} applied={34} />
                            <BarRow day="Fri" view={80} applied={60} />
                            <BarRow day="Sat" view={50} applied={90} />
                            <BarRow day="Sun" view={100} applied={45} />
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-[8px] text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-sm bg-[#FFB836]" />Job View
                            </span>
                            <span className="flex items-center gap-1 text-[8px] text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-sm bg-[#4640DE]" />Job Applied
                            </span>
                          </div>
                        </div>

                        {/* Job Views + Applied beside chart */}
                        <div className="flex flex-col gap-2 w-28 xl:w-32 shrink-0">
                          <div className="border border-gray-100 rounded-lg p-2 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] font-semibold text-gray-900">Job Views</span>
                              <span className="w-5 h-5 rounded-full bg-[#FFB836] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </span>
                            </div>
                            <p className="font-bold text-base text-gray-900">2,342</p>
                            <p className="text-[8px] text-gray-400">This Week <span className="text-green-500">6.4% ▲</span></p>
                          </div>
                          <div className="border border-gray-100 rounded-lg p-2 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] font-semibold text-gray-900">Job Applied</span>
                              <span className="w-5 h-5 rounded-full bg-[#4640DE] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </span>
                            </div>
                            <p className="font-bold text-base text-gray-900">654</p>
                            <p className="text-[8px] text-gray-400">This Week <span className="text-red-500">0.5% ▼</span></p>
                          </div>
                          <div className="border border-gray-100 rounded-lg p-2">
                            <p className="text-[9px] font-semibold text-gray-900 mb-0.5">Job Open</p>
                            <p className="font-bold text-base text-gray-900">12</p>
                            <p className="text-[8px] text-gray-400">Jobs Opened</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Far right column (xl+) */}
                    <div className="hidden xl:flex flex-col gap-2 w-36 shrink-0 p-3 pl-0 border-l border-gray-100">
                      <div className="border border-gray-100 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-gray-900 mb-0.5">Job Open</p>
                        <p className="font-bold text-xl text-gray-900">12</p>
                        <p className="text-[8px] text-gray-400">Jobs Opened</p>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-gray-900 mb-1">Applicants Summary</p>
                        <p className="font-bold text-xl text-gray-900">
                          67 <span className="text-[10px] font-normal text-gray-400">Applicants</span>
                        </p>
                        <div className="flex rounded-full overflow-hidden h-1.5 mt-2 mb-2.5">
                          <div className="bg-[#4640DE]" style={{ width: '30%' }} />
                          <div className="bg-[#FFB836]" style={{ width: '22%' }} />
                          <div className="bg-[#56CDAD]" style={{ width: '16%' }} />
                          <div className="bg-[#FF6550]" style={{ width: '20%' }} />
                          <div className="bg-[#26A4FF]" style={{ width: '12%' }} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-1.5 gap-y-1 text-[7px] text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#4640DE] shrink-0" />Full Time : 45
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#FFB836] shrink-0" />Internship : 32
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#56CDAD] shrink-0" />Part-Time : 24
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#FF6550] shrink-0" />Contract : 30
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#26A4FF] shrink-0" />Remote : 22
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile Layout ─── */}
        <div className="lg:hidden py-14 sm:py-16">
          {/* Text */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Start posting jobs
              <br />
              today
            </h2>
            <p className="text-white/80 text-base sm:text-lg">
              Start posting jobs for only $10.
            </p>
          </div>

          {/* CTA button in white bar */}
          <div className="bg-white py-4 px-6 text-center -mx-6 sm:-mx-10 mb-8">
            <Link
              href="/signup"
              className="inline-block text-[#4640DE] font-bold text-lg sm:text-xl hover:underline"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Dashboard preview (partial, left-aligned) */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto sm:max-w-lg">
            {/* Top bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Image src="/quickhire-logo.png" alt="Logo" width={16} height={16} />
                <span className="font-bold text-[10px] text-gray-900">QuickHire</span>
              </div>
              <button className="bg-[#4640DE] text-white text-[8px] font-semibold px-2 py-1 rounded flex items-center gap-0.5">
                <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Post
              </button>
            </div>

            <div className="flex">
              {/* Mini sidebar */}
              <div className="hidden sm:flex flex-col w-28 border-r border-gray-100 py-2 px-1.5 shrink-0">
                <SidebarItem label="Dashboard" active icon={icons.dashboard} />
                <SidebarItem label="Messages" badge="1" icon={icons.messages} />
                <SidebarItem label="Company Profile" icon={icons.company} />
                <SidebarItem label="All Applicants" icon={icons.applicants} />
                <SidebarItem label="Job Listing" icon={icons.listing} />
                <div className="mt-3 pt-2 border-t border-gray-100 px-1.5">
                  <p className="text-[8px] text-gray-400 font-medium uppercase mb-1">Settings</p>
                  <SidebarItem label="Settings" icon={icons.settings} />
                  <SidebarItem label="Help" icon={icons.help} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-2.5 min-w-0">
                <h3 className="font-bold text-[10px] text-gray-900">Good morning, Maria</h3>
                <p className="text-[8px] text-gray-400 mb-2 truncate">Here is what&apos;s happening with your job listings from July 19 - July 25.</p>

                <div className="flex gap-1.5 mb-3">
                  <div className="flex-1">
                    <div className="border border-gray-100 rounded-lg p-2">
                      <h4 className="font-bold text-[9px] text-gray-900 mb-1">Company Visitors</h4>
                      <p className="font-bold text-lg text-[#4640DE]">21,457</p>
                      <p className="text-[7px] text-gray-400">Visitors from July 19 - July 25</p>
                      <div className="flex items-end justify-between gap-0.5 mt-2 h-12">
                        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => (
                          <div key={d} className="flex flex-col items-center gap-0.5">
                            <div className={`w-2.5 rounded-t ${i === 5 ? 'bg-[#4640DE]' : 'bg-gray-200'}`} style={{ height: `${[30,45,35,50,40,75,35][i]}%` }} />
                            <span className="text-[6px] text-gray-400">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="border border-gray-100 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[9px] text-gray-900">Applicants Statistic</h4>
                        <span className="text-[7px] text-[#4640DE]">View All Jobs →</span>
                      </div>
                      <p className="font-bold text-lg text-gray-900">158 <span className="text-[8px] font-normal text-gray-400">Applicants</span></p>
                      <div className="flex rounded-full overflow-hidden h-1.5 mt-1.5 mb-2">
                        <div className="bg-[#4640DE]" style={{ width: '35%' }} />
                        <div className="bg-gray-800" style={{ width: '15%' }} />
                        <div className="bg-[#26A4FF]" style={{ width: '25%' }} />
                        <div className="bg-gray-300" style={{ width: '25%' }} />
                      </div>
                      <div className="space-y-1 text-[7px] text-gray-600">
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#4640DE] rounded-sm" />Social Media Specialist</span><span>67</span></div>
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-800 rounded-sm" />Senior Engineer</span><span>21</span></div>
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#26A4FF] rounded-sm" />Senior Engineer</span><span>38</span></div>
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" />Other</span><span>54</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-2">
                  <h4 className="font-bold text-[9px] text-gray-900 mb-1.5">Recent Applicants</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-[8px] text-gray-900">Jake Gyll</p>
                      <p className="text-[7px] text-gray-400">Social Media Specialist</p>
                    </div>
                    <div className="ml-auto text-right shrink-0">
                      <p className="text-[7px] text-gray-400">2 days ago</p>
                      <span className="text-[7px] text-[#4640DE] border border-[#4640DE] px-1.5 py-0.5 rounded">See Application</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}