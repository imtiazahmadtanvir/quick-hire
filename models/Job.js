import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title must be less than 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'contract', 'internship'],
      required: [true, 'Job type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    salaryMin: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
    },
    salaryMax: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Text index for search
JobSchema.index({ title: 'text', company: 'text', description: 'text' });

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;
