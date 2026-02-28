import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import Application from '@/models/Application';
import { requireEmployer } from '@/lib/auth';

// GET /api/jobs/[id] — public
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const job = await Job.findById(id).populate('postedBy', 'fullName email').lean();
    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    if (error.name === 'CastError') {
      return NextResponse.json({ success: false, message: 'Invalid job ID' }, { status: 400 });
    }
    console.error('GET /api/jobs/[id] error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/jobs/[id] — employer only, must own the job
export async function PUT(request, { params }) {
  try {
    const auth = requireEmployer(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    await connectDB();

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    if (job.postedBy.toString() !== auth.user.userId) {
      return NextResponse.json({ success: false, message: 'Forbidden: you can only edit your own jobs' }, { status: 403 });
    }

    const body = await request.json();
    const allowedFields = ['title', 'company', 'location', 'type', 'category', 'description', 'requirements', 'salaryMin', 'salaryMax', 'currency', 'isActive', 'companyLogo'];
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) job[field] = body[field];
    });

    await job.save();
    return NextResponse.json({ success: true, message: 'Job updated successfully', data: job });
  } catch (error) {
    if (error.name === 'CastError') {
      return NextResponse.json({ success: false, message: 'Invalid job ID' }, { status: 400 });
    }
    console.error('PUT /api/jobs/[id] error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/jobs/[id] — employer only, must own the job
export async function DELETE(request, { params }) {
  try {
    const auth = requireEmployer(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    await connectDB();

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    if (job.postedBy.toString() !== auth.user.userId) {
      return NextResponse.json({ success: false, message: 'Forbidden: you can only delete your own jobs' }, { status: 403 });
    }

    await Promise.all([
      Job.findByIdAndDelete(id),
      Application.deleteMany({ job: id }),
    ]);

    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return NextResponse.json({ success: false, message: 'Invalid job ID' }, { status: 400 });
    }
    console.error('DELETE /api/jobs/[id] error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
