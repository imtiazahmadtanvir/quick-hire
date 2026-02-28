import Link from 'next/link';
import Image from 'next/image';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

/* ── tiny stat cards shown inside the dashboard preview ── */
function StatCard({ number, label, color }) {
  const colors = {
    purple: 'bg-[#4640DE]',
    green: 'bg-[#56CDAD]',
    blue: 'bg-[#26A4FF]',
  };
  return (
    <div className={`${colors[color]} rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-2 flex-1 min-w-0`}>
      <div className="min-w-0">
        <span className="text-white font-bold text-lg sm:text-xl leading-none">{number}</span>
        <p className="text-white/80 text-[10px] sm:text-xs mt-0.5 leading-tight truncate">{label}</p>
      </div>
      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

/* ── bar chart row ── */
function BarRow({ day, view, applied, maxVal = 140 }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex gap-0.5 items-end h-16 sm:h-20">
        <div className="w-3 sm:w-4 rounded-t bg-[#FFB836]" style={{ height: `${(view / maxVal) * 100}%` }} />
        <div className="w-3 sm:w-4 rounded-t bg-[#4640DE]" style={{ height: `${(applied / maxVal) * 100}%` }} />
      </div>
      <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1">{day}</span>
    </div>
  );
}

/* ── sidebar item ── */
function SidebarItem({ label, active, badge }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs ${
        active ? 'bg-indigo-50 text-[#4640DE] font-semibold' : 'text-gray-500'
      }`}
    >
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto w-4 h-4 rounded-full bg-[#4640DE] text-white text-[9px] flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function CTABanner() {
  return (
    <section className={`${epilogue.className} relative overflow-hidden`}>
      {/* ─── Purple background with diagonal corner ─── */}
      <div className="absolute inset-0 bg-[#4640DE]" />
      {/* Diagonal white triangle top-left */}
      <div className="absolute top-0 left-0">
        <div className="w-0 h-0 border-l-120 sm:border-l-200 border-l-white border-b-120 sm:border-b-200 border-b-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-20 lg:py-24">
          {/* ─── Left: Text Content ─── */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="text-white/80 text-base sm:text-lg">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#4640DE] font-semibold text-[15px] px-7 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* ─── Right: Dashboard Preview ─── */}
          <div className="relative">
            {/* Dashboard card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="flex">
                {/* Sidebar (hidden on small mobile) */}
                <div className="hidden sm:flex flex-col w-35 lg:w-40 border-r border-gray-100 py-4 px-2 shrink-0">
                  {/* Logo */}
                  <div className="flex items-center gap-1.5 px-3 mb-4">
                    <Image src="/quickhire-logo.png" alt="Logo" width={20} height={20} />
                    <span className="font-bold text-[11px] text-gray-900">QuickHire</span>
                  </div>
                  <SidebarItem label="Dashboard" active />
                  <SidebarItem label="Messages" badge="1" />
                  <SidebarItem label="Company Profile" />
                  <SidebarItem label="All Applicants" />
                  <SidebarItem label="Job Listing" />
                  <SidebarItem label="My Schedule" />
                  <div className="mt-4 pt-3 border-t border-gray-100 px-3">
                    <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-2">Settings</p>
                    <SidebarItem label="Settings" />
                    <SidebarItem label="Help Center" />
                  </div>
                </div>

                {/* Main content area */}
                <div className="flex-1 p-3 sm:p-4 min-w-0">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900">Good morning, Maria</h3>
                      <p className="text-[9px] sm:text-[10px] text-gray-400">Here is your job listings statistic report from July 19 - July 25.</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-2 py-0.5">Jul 19 - Jul 25</span>
                    </div>
                  </div>

                  {/* 3 stat cards row */}
                  <div className="flex gap-2 mb-4">
                    <StatCard number="76" label="New candidates to review" color="purple" />
                    <StatCard number="3" label="Schedule for today" color="green" />
                    <StatCard number="24" label="Messages received" color="blue" />
                  </div>

                  {/* Job statistics + side cards */}
                  <div className="flex gap-3">
                    {/* Chart area */}
                    <div className="flex-1 border border-gray-100 rounded-lg p-3 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="font-bold text-[11px] sm:text-xs text-gray-900">Job statistics</h4>
                          <p className="text-[8px] sm:text-[9px] text-gray-400">Showing Jobstatistic Jul 19-25</p>
                        </div>
                        <div className="hidden sm:flex border border-gray-200 rounded overflow-hidden text-[9px]">
                          <span className="px-2 py-0.5 text-gray-400">Week</span>
                          <span className="px-2 py-0.5 bg-[#4640DE] text-white">Month</span>
                          <span className="px-2 py-0.5 text-gray-400">Year</span>
                        </div>
                      </div>

                      {/* Tab row */}
                      <div className="flex gap-3 mb-3 border-b border-gray-100 pb-1.5">
                        <span className="text-[9px] sm:text-[10px] font-semibold text-gray-900 border-b-2 border-[#4640DE] pb-1">Overview</span>
                        <span className="text-[9px] sm:text-[10px] text-gray-400">Jobs View</span>
                        <span className="text-[9px] sm:text-[10px] text-gray-400">Jobs Applied</span>
                      </div>

                      {/* Bar chart */}
                      <div className="flex items-end justify-between gap-1 sm:gap-2">
                        <BarRow day="Mon" view={60} applied={30} />
                        <BarRow day="Tue" view={40} applied={50} />
                        <BarRow day="Wed" view={90} applied={70} />
                        <BarRow day="Thu" view={120} applied={34} />
                        <BarRow day="Fri" view={80} applied={60} />
                        <BarRow day="Sat" view={50} applied={90} />
                        <BarRow day="Sun" view={100} applied={45} />
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[8px] sm:text-[9px] text-gray-400">
                          <span className="w-2 h-2 rounded-sm bg-[#FFB836]" />Job View
                        </span>
                        <span className="flex items-center gap-1 text-[8px] sm:text-[9px] text-gray-400">
                          <span className="w-2 h-2 rounded-sm bg-[#4640DE]" />Job Applied
                        </span>
                      </div>
                    </div>

                    {/* Right side cards (hidden on very small screens) */}
                    <div className="hidden md:flex flex-col gap-2 w-32.5 lg:w-37.5 shrink-0">
                      {/* Job Views */}
                      <div className="border border-gray-100 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-gray-900">Job Views</span>
                          <span className="w-5 h-5 rounded-full bg-[#FFB836] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </span>
                        </div>
                        <p className="font-bold text-lg text-gray-900">2,342</p>
                        <p className="text-[9px] text-gray-400">This Week <span className="text-green-500">6.4% ▲</span></p>
                      </div>

                      {/* Job Applied */}
                      <div className="border border-gray-100 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-gray-900">Job Applied</span>
                          <span className="w-5 h-5 rounded-full bg-[#4640DE] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </span>
                        </div>
                        <p className="font-bold text-lg text-gray-900">654</p>
                        <p className="text-[9px] text-gray-400">This Week <span className="text-red-500">0.5% ▼</span></p>
                      </div>

                      {/* Job Open */}
                      <div className="border border-gray-100 rounded-lg p-2.5">
                        <p className="text-[10px] font-semibold text-gray-900 mb-0.5">Job Open</p>
                        <p className="font-bold text-lg text-gray-900">12</p>
                        <p className="text-[9px] text-gray-400">Jobs Opened</p>
                      </div>
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