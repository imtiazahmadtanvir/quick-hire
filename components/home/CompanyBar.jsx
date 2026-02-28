import Image from 'next/image';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const companies = [
  { name: 'Vodafone', logo: '/company/Vodophone.png', width: 160, height: 40 },
  { name: 'Intel', logo: '/company/intel.png', width: 100, height: 40 },
  { name: 'Tesla', logo: '/company/Tesla.png', width: 130, height: 30 },
  { name: 'AMD', logo: '/company/Amd.png', width: 110, height: 30 },
  { name: 'Talkit', logo: '/company/talkit.png', width: 100, height: 35 },
];

export default function CompanyBar() {
  return (
    <section className={`${epilogue.className} py-10 sm:py-14 bg-white`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
          Companies we helped grow
        </p>

        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center justify-between gap-8 flex-wrap">
          {companies.map((company) => (
            <div key={company.name} className="grayscale opacity-60 hover:opacity-80 transition-opacity">
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="object-contain h-8 sm:h-10 w-auto"
              />
            </div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="sm:hidden grid grid-cols-2 gap-8 items-center">
          {companies.map((company) => (
            <div key={company.name} className="grayscale opacity-60 flex justify-start">
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="object-contain h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}