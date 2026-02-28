import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job reference is required'],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant reference is required'],
    },
    coverLetter: {
      type: String,
      default: '',
      maxlength: [2000, 'Cover letter must be less than 2000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
    resume: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications — one user can only apply once per job
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application =
  mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

export default Application;
