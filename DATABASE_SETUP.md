# Database Setup Guide

This guide walks you through setting up PostgreSQL database for the Course Platform.

## Overview

The application uses:
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **Next.js API Routes** - Backend endpoints

## Database Schema

The schema includes 7 models:
- **User** - Learner accounts (email, name, phone)
- **Course** - Course information
- **Round** - Course sections/rounds
- **Topic** - Topics within rounds
- **Module** - Individual video lessons
- **UserProgress** - Watch time tracking (userId + moduleId unique)
- **CourseAccess** - Course assignments to learners

## Setup Options

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL**
   ```bash
   # macOS (using Homebrew)
   brew install postgresql@15
   brew services start postgresql@15

   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql

   # Windows
   # Download from: https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```bash
   # Connect to PostgreSQL
   psql postgres

   # Create database and user
   CREATE DATABASE courseplatform;
   CREATE USER courseuser WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE courseplatform TO courseuser;
   \q
   ```

3. **Update .env file**
   ```env
   DATABASE_URL="postgresql://courseuser:your_secure_password@localhost:5432/courseplatform?schema=public"
   ```

### Option 2: Supabase (Free Cloud PostgreSQL)

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for database provisioning

2. **Get Connection String**
   - Go to Project Settings > Database
   - Copy "Connection string" (URI mode)
   - Replace `[YOUR-PASSWORD]` with your database password

3. **Update .env file**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
   ```

### Option 3: Neon (Serverless PostgreSQL)

1. **Create Account**
   - Go to [neon.tech](https://neon.tech)
   - Create new project

2. **Get Connection String**
   - Copy connection string from dashboard

3. **Update .env file**
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb"
   ```

### Option 4: Railway (Simple Cloud Deployment)

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Add PostgreSQL database

2. **Get Connection String**
   - Click on PostgreSQL service
   - Copy `DATABASE_URL` from Variables tab

3. **Update .env file**
   - Paste the connection string

## Running Migrations

After setting up your database and updating `.env`:

1. **Create migration and apply to database**
   ```bash
   npx prisma migrate dev --name init
   ```

   This will:
   - Create migration files in `prisma/migrations/`
   - Apply migrations to your database
   - Generate Prisma Client

2. **Verify database setup**
   ```bash
   npx prisma studio
   ```

   This opens a visual database browser at `http://localhost:5555`

## Seeding Data (Optional)

To populate your database with initial data:

1. **Create seed script** `prisma/seed.ts`:
   ```typescript
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   async function main() {
     // Create a test user
     const user = await prisma.user.create({
       data: {
         email: 'test@example.com',
         name: 'Test User',
       },
     });

     console.log('Created user:', user);

     // Add courses, modules, etc.
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

2. **Add to package.json**:
   ```json
   {
     "prisma": {
       "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
     }
   }
   ```

3. **Install ts-node**:
   ```bash
   npm install -D ts-node
   ```

4. **Run seed**:
   ```bash
   npx prisma db seed
   ```

## Testing API Endpoints

### Test Progress Update (POST)

```bash
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-here",
    "moduleId": "module-id-here",
    "watchedDuration": 120,
    "isCompleted": false
  }'
```

### Test Get User Progress (GET)

```bash
curl "http://localhost:3000/api/progress?userId=user-id-here&moduleId=module-id-here"
```

### Test Get All User Progress (GET)

```bash
curl "http://localhost:3000/api/progress/user/user-id-here"
```

## Common Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name description_of_changes

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (visual database browser)
npx prisma studio

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

## Troubleshooting

### Connection Issues

1. **Check DATABASE_URL format**:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
   ```

2. **Test connection**:
   ```bash
   npx prisma db pull
   ```

### Migration Errors

1. **Reset and retry**:
   ```bash
   npx prisma migrate reset
   npx prisma migrate dev
   ```

2. **Check PostgreSQL is running**:
   ```bash
   # macOS
   brew services list | grep postgresql

   # Linux
   sudo systemctl status postgresql
   ```

### Prisma Client Not Found

```bash
npx prisma generate
```

## Next Steps

After database setup:

1. Update components to use API instead of mock data
2. Implement authentication to get real user IDs
3. Add error handling in API routes
4. Set up database backups
5. Configure connection pooling for production

## Security Notes

- Never commit `.env` file to version control
- Use strong passwords for database users
- Enable SSL for production databases
- Implement rate limiting on API routes
- Validate and sanitize all user inputs
