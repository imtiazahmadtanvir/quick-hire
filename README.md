# QuickHire — Job Marketplace Platform

A full-stack job marketplace web application where **employers** can post, edit, and manage job listings, and **job seekers** can browse, search, filter, and apply for jobs — all with a modern, responsive UI.

**Live Demo:** [https://quickhire-mu.vercel.app](https://quickhire-mu.vercel.app)

---

## Features

### Job Seekers
- Browse and search jobs by title, keyword, or company
- Filter jobs by **category**, **type** (full-time, part-time, remote, contract, internship), and **location**
- View detailed job pages with description, requirements, salary, and company info
- Apply to jobs with **Name**, **Email**, **Resume link (URL)**, and **Cover note**
- Personal dashboard to track all applications and their status (pending, reviewed, accepted, rejected)

### Employers
- Post new job listings with full details, salary range, requirements, and company logo (Cloudinary upload)
- Edit and delete their own jobs
- View all received applications with applicant details, cover notes, and resume links
- Update application status (pending → reviewed → accepted/rejected)
- Dashboard with stats: jobs posted, active jobs, total applications, pending reviews

### Authentication & Authorization
- Role-based signup (Job Seeker / Employer)
- JWT-based authentication with protected routes
- Route guards: employers can't apply; jobseekers can't post jobs

### General
- Fully responsive design (mobile, tablet, desktop)
- Landing page with hero section, featured jobs, latest jobs, category grid, company bar, and CTA banner
- Browse companies page with search
- Toast notifications for all actions
- Skeleton loading states throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, Tailwind CSS 4 |
| **Backend** | Next.js API Routes (serverless) |
| **Database** | MongoDB Atlas (Mongoose 9) |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs |
| **File Uploads** | Cloudinary (company logos) |
| **Notifications** | react-hot-toast |
| **Fonts** | Epilogue, Red Hat Display (Google Fonts) |
| **Deployment** | Vercel |

---

## Project Structure

```
quickhire/
├── app/
│   ├── globals.css
│   ├── layout.jsx              # Root layout + ToastProvider
│   ├── page.jsx                # Landing page
│   ├── login/page.jsx          # Login page
│   ├── signup/page.jsx         # Signup page
│   ├── jobs/
│   │   ├── page.jsx            # Jobs listing (search, filter, paginate)
│   │   └── [id]/page.jsx       # Job detail + Apply modal
│   ├── companies/page.jsx      # Browse companies
│   ├── create-job/page.jsx     # Post a job form (employer)
│   ├── admin/page.jsx          # Employer dashboard
│   ├── dashboard/page.jsx      # Jobseeker dashboard
│   └── api/
│       ├── auth/
│       │   ├── signup/route.js
│       │   └── login/route.js
│       ├── jobs/
│       │   ├── route.js        # GET (list/search/filter), POST (create)
│       │   └── [id]/route.js   # GET, PUT, DELETE
│       ├── applications/
│       │   ├── route.js        # GET (role-based), POST (apply)
│       │   └── [id]/route.js   # PATCH (update status)
│       ├── employers/route.js  # GET all employers
│       └── profile/route.js    # GET/PUT user profile
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Role-aware navigation
│   │   └── Footer.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── CompanyBar.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── FeaturedJobs.jsx
│   │   ├── CTABanner.jsx
│   │   └── LatestJobs.jsx
│   └── shared/
│       ├── CloudinaryUpload.jsx
│       └── ToastProvider.jsx
├── lib/
│   ├── db.js                   # MongoDB connection
│   ├── jwt.js                  # JWT sign/verify helpers
│   └── auth.js                 # Auth middleware helpers
├── models/
│   ├── User.js                 # fullName, email, password, role
│   ├── Job.js                  # title, company, location, type, category, etc.
│   └── Application.js          # job, applicant, name, email, resumeLink, coverLetter, status
└── public/
    └── quickhire-logo.png
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register a new user |
| POST | `/api/auth/login` | — | Login and receive JWT |
| GET | `/api/jobs` | — | List jobs (search, filter, paginate) |
| GET | `/api/jobs?mine=true` | Employer | Get employer's own jobs |
| POST | `/api/jobs` | Employer | Create a new job |
| GET | `/api/jobs/:id` | — | Get single job details |
| PUT | `/api/jobs/:id` | Owner | Update a job |
| DELETE | `/api/jobs/:id` | Owner | Delete a job + its applications |
| GET | `/api/applications` | Auth | Role-based: own apps or received apps |
| POST | `/api/applications` | Jobseeker | Apply to a job |
| PATCH | `/api/applications/:id` | Employer | Update application status |
| GET | `/api/employers` | — | List all employers |
| GET/PUT | `/api/profile` | Auth | View/update profile |

---

## Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/quickhire.git
cd quickhire

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your MongoDB URI, JWT secret, and Cloudinary credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

Deployed on **Vercel** with environment variables configured in the Vercel dashboard.

```bash
vercel --prod
```
