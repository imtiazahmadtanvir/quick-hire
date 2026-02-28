import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { requireAuth, requireJobseeker } from '@/lib/auth';

// GET /api/applications
// - jobseeker: their own applications
// - employer: applications on their posted jobs
export async function GET(request) {
  try {
    const auth = requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    await connectDB();

    let applications;

    if (auth.user.role === 'jobseeker') {
      applications = await Application.find({ applicant: auth.user.userId })
        .populate({ path: 'job', select: 'title company location type category isActive' })
        .sort({ createdAt: -1 })
        .lean();
    } else if (auth.user.role === 'employer') {
      const myJobs = await Job.find({ postedBy: auth.user.userId }).select('_id').lean();
      const jobIds = myJobs.map((j) => j._id);
      applications = await Application.find({ job: { $in: jobIds } })
        .populate({ path: 'job', select: 'title company location type' })
        .populate({ path: 'applicant', select: 'fullName email' })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error('GET /api/applications error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/applications — jobseeker only
export async function POST(request) {
  try {
    const auth = requireJobseeker(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { jobId, coverLetter, resume } = body;

    if (!jobId) {
      return NextResponse.json({ success: false, message: 'Job ID is required' }, { status: 400 });
    }

    await connectDB();

    // Verify job exists and is active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return NextResponse.json({ success: false, message: 'Job not found or no longer active' }, { status: 404 });
    }

    // Check for duplicate application
    const existing = await Application.findOne({ job: jobId, applicant: auth.user.userId });
    if (existing) {
      return NextResponse.json({ success: false, message: 'You have already applied to this job' }, { status: 409 });
    }

    const application = await Application.create({
      job: jobId,
      applicant: auth.user.userId,
      coverLetter: coverLetter || '',
      resume: resume || '',
    });

    // Increment applicant count on the job
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', data: application },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'You have already applied to this job' }, { status: 409 });
    }
    if (error.name === 'CastError') {
      return NextResponse.json({ success: false, message: 'Invalid job ID' }, { status: 400 });
    }
    console.error('POST /api/applications error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
