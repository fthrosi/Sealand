# Dynamic Company Profile Website
A full-stack dynamic company profile website built for a real client, allowing content updates without redeploying the frontend.
## My Role
- Developed the backend API using Express.js and MySQL
- Designed database structure for dynamic content management
- Connected frontend with backend APIs
- Helped deliver a responsive production-ready website
## Architecture Overview
The frontend application communicates with the Express.js backend through RESTful APIs. Backend services manage dynamic content using Prisma ORM and MySQL database integration. Uploaded assets and media are managed through dedicated storage handling, while deployment is managed using Docker, PM2, and Nginx reverse proxy on Ubuntu VPS environments.
## Notes
This project was developed for a real client. Some credentials, environment variables, and sensitive data are excluded from the repository.
## Live Demo
Production: https://sealand.co.id
## Tech Stack
### Frontend
- Next.js
- TypeScript
- Tailwind CSS
### Backend
- Express.js
- Prisma ORM
- MySQL
## Database Management
- Prisma ORM for database access and schema management
- Prisma Migration for database versioning
- Seeder scripts for initial data population
### DevOps & Services
- Docker
- VPS Deployment
- Nginx
- PM2
## Features
- Dynamic company profile content management
- CRUD for homepage/content sections
- Responsive landing page
- RESTful API integration
- Admin-side content management
- Production deployment
## Production Features
- Dynamic content updates without redeployment
- Production deployment using Docker and Nginx
- Environment-based configuration
- Responsive multi-device support
- Structured backend architecture
## Project Structure
### Project Structure Front-end

```bash
src/
├── animations/        # Animation assets / lottie files
├── api/               # API service layer / fetchers
├── app/               # Next.js App Router pages
│   ├── (guest)/       # Public routes
│   ├── admin/         # Admin pages
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
│
├── components/        # Reusable UI components
│   ├── home/
│   ├── modals/
│   ├── navigation/
│   ├── teams/
│   ├── ui/
│   └── vessels/
│
├── const/             # Static constants
├── icon/              # SVG / icon assets
├── lib/               # Utility libraries / helpers
├── schema/            # Validation schema (Zod/Yup/etc)
├── store/             # Global state management
├── types/             # TypeScript types/interfaces
│
└── middleware.ts      # Next.js middleware
```

### Backend Project Structure
```bash
.
├── prisma/
│   ├── migrations/        # Database migration files
│   └── schema.prisma      # Prisma database schema
│
├── src/
│   ├── config/            # App configuration
│   ├── features/          # Main business features/modules
│   ├── middleware/        # Express middlewares
│   ├── types/             # TypeScript types/interfaces
│   ├── app.ts             # Express app configuration
│   ├── seed.ts            # Database seeder
│   └── server.ts          # Server entry point
│
├── storage/
│   └── private/
│       ├── documents/     # Private document files
│       └── photos/        # Private photo files
│
├── uploads/               # Uploaded public files
├── .env                   # Environment variables
├── Dockerfile             # Docker configuration
├── package.json           # Dependencies and scripts
├── prisma.config.ts       # Prisma configuration
└── tsconfig.json          # TypeScript configuration
```
## Installation
### Frontend
```bash
cd company-profile-sealand
npm install
```
#### Start Frontend
```bash
npm run dev
```
### Backend
```bash
cd sealandBE
npm install
npx prisma generate
```
#### Create .env File
```bash
PORT=
JWT_SECRET=
jwt_EXPIRES_IN=
DATABASE_URL=
BASE_URL=
NODE_ENV=
CORS_ORIGIN=
```
#### Run Prisma Migration
```bash
npx prisma migrate dev
```
#### Run Seeder
```bash
npx prisma db seed
```
#### Start Backend
```bash
npm run dev
```
## License
This project is intended for portfolio and educational purposes only.
