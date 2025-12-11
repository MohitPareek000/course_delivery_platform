# Learner Enrollment System

This directory contains the learner enrollment data and instructions for managing course assignments.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp learners.example.json learners.json
   ```

2. **Edit `learners.json` with your learner data**

3. **Run the enrollment script:**
   ```bash
   npm run seed:learners
   ```

## File Format

Create a file named `learners.json` in this directory with the following format:

```json
{
  "learners": [
    {
      "email": "learner@company.com",
      "name": "Learner Name",
      "courses": ["course-1", "course-2"]
    }
  ]
}
```

### Fields:

- **email** (required): The learner's email address (used for login)
- **name** (required): The learner's full name
- **courses** (required): Array of course IDs to assign to the learner

## Available Course IDs

Based on your current setup, here are the available course IDs:

- `course-1` - TCS Interview Preparation
- `course-2` - Infosys Interview Preparation
- `course-3` - Java Full Stack Bootcamp

## How It Works

1. The script reads your `learners.json` file
2. For each learner:
   - Creates or updates the user account in the database
   - Assigns the specified courses to the learner
   - If a course doesn't exist, it shows a warning and skips it
3. Shows a summary of successful and failed enrollments

## Features

- **Idempotent**: Safe to run multiple times - won't create duplicates
- **Updates**: If a learner already exists, it updates their name
- **Course Assignment**: Automatically assigns courses to learners
- **Validation**: Checks if courses exist before assigning
- **Error Handling**: Shows clear errors if something goes wrong

## Example Usage

### Example 1: Single Learner with Multiple Courses

```json
{
  "learners": [
    {
      "email": "john.doe@company.com",
      "name": "John Doe",
      "courses": ["course-1", "course-2", "course-3"]
    }
  ]
}
```

### Example 2: Multiple Learners

```json
{
  "learners": [
    {
      "email": "john.doe@company.com",
      "name": "John Doe",
      "courses": ["course-1"]
    },
    {
      "email": "jane.smith@company.com",
      "name": "Jane Smith",
      "courses": ["course-2"]
    },
    {
      "email": "bob.wilson@company.com",
      "name": "Bob Wilson",
      "courses": ["course-1", "course-3"]
    }
  ]
}
```

### Example 3: Batch Enrollment for a Company

```json
{
  "learners": [
    {
      "email": "alice@techcorp.com",
      "name": "Alice Johnson",
      "courses": ["course-1", "course-2"]
    },
    {
      "email": "bob@techcorp.com",
      "name": "Bob Williams",
      "courses": ["course-1", "course-2"]
    },
    {
      "email": "carol@techcorp.com",
      "name": "Carol Davis",
      "courses": ["course-3"]
    }
  ]
}
```

## Running the Script

```bash
npm run seed:learners
```

### Expected Output:

```
📚 Starting learner enrollment...

👥 Found 3 learners to process

Processing: john.doe@company.com...
  ✓ User created/updated: John Doe (clxxx123...)
  ✓ Assigned course: course-1
  ✓ Assigned course: course-2
  ✅ Successfully enrolled john.doe@company.com

Processing: jane.smith@company.com...
  ✓ User created/updated: Jane Smith (clxxx456...)
  ✓ Assigned course: course-1
  ✅ Successfully enrolled jane.smith@company.com

==================================================
📊 Summary:
  ✅ Successfully processed: 3 learners
==================================================

🎉 Learner enrollment complete!
```

## Troubleshooting

### Error: "learners.json file not found"
**Solution**: Create a `learners.json` file in the `data/` directory.

### Warning: "Course XXX not found"
**Solution**: Make sure you're using valid course IDs. Check the "Available Course IDs" section above.

### Error: "Invalid JSON"
**Solution**: Make sure your JSON syntax is correct. Use a JSON validator or copy from the example file.

## Adding/Updating Learners

You can run the script as many times as you need:

- **Adding new learners**: Just add them to the `learners.json` file and run the script
- **Updating learners**: Change the name or courses and run the script - it will update existing learners
- **Adding more courses**: Add course IDs to the courses array and run the script

## Security Notes

- **Important**: Do NOT commit `learners.json` to version control if it contains real email addresses
- The `learners.json` file should be kept private and secure
- Only `learners.example.json` should be committed to git

## Need Help?

If you encounter any issues or need to modify the enrollment process, contact your system administrator.
