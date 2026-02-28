mkdir -p components/layout
mkdir -p components/home
mkdir -p components/shared
mkdir -p app/api/jobs
mkdir -p app/api/jobs/[id]
mkdir -p app/api/applications
mkdir -p app/jobs/[id]
mkdir -p app/admin
mkdir -p lib
mkdir -p models
```

Your final structure:
```
quickhire/
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx                    # Home page
│   ├── jobs/
│   │   └── [id]/
│   │       └── page.jsx            # Job detail
│   ├── admin/
│   │   └── page.jsx                # Admin panel
│   └── api/
│       ├── jobs/
│       │   ├── route.js            # GET all, POST
│       │   └── [id]/
│       │       └── route.js        # GET one, DELETE
│       └── applications/
│           └── route.js            # POST application
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── CompanyBar.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── FeaturedJobs.jsx
│   │   ├── CTABanner.jsx
│   │   └── LatestJobs.jsx
│   └── shared/
│       ├── JobCard.jsx
│       ├── JobListItem.jsx
│       ├── CategoryCard.jsx
│       └── Badge.jsx
├── lib/
│   └── db.js                       # MongoDB connection
├── models/
│   ├── Job.js
│   └── Application.js
├── .env.local
└── README.md
```

---

## Step 5 — Setup MongoDB Connection

**`.env.local`**
```
MONGODB_URI=mongodb://localhost:27017/quickhire# quick-hire
