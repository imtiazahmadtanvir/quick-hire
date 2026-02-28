import db from '@/lib/db';
import User from '@/models/User';
import Job from '@/models/Job';

export async function GET(req) {
  try {
    await db();

    // Get all employers
    const employers = await User.find({ role: 'employer' }).select('-password').lean();

    // For each employer, get their job count and company names
    const employersWithDetails = await Promise.all(
      employers.map(async (employer) => {
        const jobs = await Job.find({ postedBy: employer._id }).select('company').lean();
        const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];

        return {
          ...employer,
          jobCount: jobs.length,
          companies: uniqueCompanies,
        };
      })
    );

    return Response.json({ employers: employersWithDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching employers:', error);
    return Response.json({ message: 'Failed to fetch employers' }, { status: 500 });
  }
}
