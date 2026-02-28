import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { requireEmployer } from '@/lib/auth';

// PATCH /api/applications/[id] — employer only: update status
export async function PATCH(request, { params }) {
  try {
    const auth = requireEmployer(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Status must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    await connectDB();

    const application = await Application.findById(id).populate('job', 'postedBy');
    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    // Verify the employer owns the job this application is for
    if (application.job.postedBy.toString() !== auth.user.userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: you can only update applications for your own jobs' },
        { status: 403 }
      );
    }

    application.status = status;
    await application.save();

    return NextResponse.json({
      success: true,
      message: 'Application status updated',
      data: { _id: application._id, status: application.status },
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return NextResponse.json({ success: false, message: 'Invalid application ID' }, { status: 400 });
    }
    console.error('PATCH /api/applications/[id] error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
