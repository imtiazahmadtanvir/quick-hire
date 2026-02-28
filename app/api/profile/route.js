import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';

// GET /api/profile — get current user profile
export async function GET(request) {
  try {
    const auth = requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    await connectDB();

    const user = await User.findById(auth.user.userId).select('-password').lean();
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/profile — update current user profile
export async function PUT(request) {
  try {
    const auth = requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { fullName, profileImage } = body;

    await connectDB();

    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(
      auth.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password').lean();

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Profile updated', data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
    }
    console.error('PUT /api/profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
