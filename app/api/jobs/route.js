import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import { requireEmployer, getAuthUser } from '@/lib/auth';

// GET /api/jobs — public, paginated, searchable, filterable
// Pass ?mine=true with auth to get only employer's own jobs (including inactive)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const mine = searchParams.get('mine') === 'true';
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '10'));

    const query = {};

    // If employer wants their own jobs, filter by postedBy and skip isActive filter
    if (mine) {
      const user = getAuthUser(request);
      if (!user) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      query.postedBy = user.userId;
    } else {
      query.isActive = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (type) query.type = type;
    if (category) query.category = { $regex: category, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('postedBy', 'fullName email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/jobs — employer only
export async function POST(request) {
  try {
    const auth = requireEmployer(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { title, company, location, type, category, description, requirements, salaryMin, salaryMax, currency, companyLogo } = body;

    if (!title || !company || !location || !type || !category || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, company, location, type, category, and description are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const job = await Job.create({
      title,
      company,
      location,
      type,
      category,
      description,
      requirements: requirements || [],
      salaryMin: salaryMin || undefined,
      salaryMax: salaryMax || undefined,
      currency: currency || 'USD',
      companyLogo: companyLogo || '',
      postedBy: auth.user.userId,
    });

    return NextResponse.json({ success: true, message: 'Job posted successfully', data: job }, { status: 201 });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
    }
    console.error('POST /api/jobs error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
