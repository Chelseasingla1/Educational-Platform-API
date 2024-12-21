# Educational Platform API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Testing Guide](#testing-guide)
6. [Error Handling](#error-handling)

## Project Overview

An educational platform API that allows users to manage courses and quizzes. Built with Node.js, Express.js, and MongoDB.

### Features
- CRUD operations for courses
- CRUD operations for quizzes
- Quiz taking and submission functionality
- Pagination support
- Comprehensive error handling
- API documentation with Swagger

### Tech Stack
- Backend: Node.js/Express.js
- Database: MongoDB
- Documentation: Swagger
- Testing: Postman

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Postman (for testing)

### Installation Steps

1. Clone the repository
```bash
git clone <repository-url>
cd education-api
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/education_platform
```

4. Set up MongoDB
- Start MongoDB service
- The database will be created automatically when you first run the application

5. Start the application
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## Database Schema

### Course Schema
```javascript
{
  category: String (required),
  chapters: [{
    title: String (required),
    description: String,
    duration: Number,
    videoLink: String
  }],
  description: String (required),
  duration: Number (required),
  instructorName: String (required),
  language: String (required),
  level: String (required),
  price: Number (required),
  status: String (enum: ['draft', 'published']),
  visibility: String (enum: ['public', 'private'])
}
```

### Quiz Schema
```javascript
{
  courseId: ObjectId (required, ref: 'Course'),
  questions: [{
    question: String (required),
    options: [String] (required),
    correctAnswer: String (required)
  }]
}
```

### Quiz Attempt Schema
```javascript
{
  quizId: ObjectId (required, ref: 'Quiz'),
  answers: [{
    questionId: String,
    selectedAnswer: String,
    isCorrect: Boolean
  }],
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  submittedAt: Date
}
```

## API Endpoints

### Course Management

#### Create Course
```http
POST /api/courses
Content-Type: application/json

{
    "category": "CBSE",
    "chapters": [{
        "title": "Chapter 1",
        "description": "Introduction",
        "duration": 1
    }],
    "description": "Course Description",
    "duration": 5,
    "instructorName": "John Doe",
    "language": "English",
    "level": "beginner",
    "price": 99,
    "status": "published",
    "visibility": "public"
}
```

#### Get Courses (with pagination)
```http
GET /api/courses?page=1&limit=10
```

#### Get Specific Course
```http
GET /api/courses/:id
```

#### Update Course
```http
PUT /api/courses/:id
Content-Type: application/json

{
    "description": "Updated description",
    "duration": 6
}
```

#### Delete Course
```http
DELETE /api/courses/:id
```

### Quiz Management

#### Create Quiz
```http
POST /api/courses/:courseId/quizzes
Content-Type: application/json

{
    "questions": [
        {
            "question": "What is Python?",
            "options": ["Programming Language", "Text Editor", "Database", "Web Server"],
            "correctAnswer": "Programming Language"
        }
    ]
}
```

#### Get Course Quizzes
```http
GET /api/courses/:courseId/quizzes?page=1&limit=10
```

#### Submit Quiz
```http
POST /api/quizzes/:id/submit
Content-Type: application/json

{
    "answers": [
        {
            "questionId": "questionId1",
            "selectedAnswer": "Programming Language"
        }
    ]
}
```

## Testing Guide

### Using Swagger Documentation
1. Access Swagger UI: `http://localhost:3000/api-docs`
2. Test endpoints directly from the browser
3. View request/response schemas

### Using Postman
1. Import the provided collection
2. Set up environment variables:
   - baseUrl: `http://localhost:3000`
3. Test flow:
   - Create a course
   - Create quizzes for the course
   - Submit quiz answers
   - View results

## Error Handling

The API uses consistent error response format:

```javascript
{
    "status": "error",
    "message": "Error message",
    "details": ["Additional error details if any"]
}
```

### Common Error Codes
- 400: Bad Request (Invalid input)
- 404: Resource Not Found
- 500: Internal Server Error

### Validation Errors
- Missing required fields
- Invalid data types
- Invalid enum values

### Database Errors
- Connection failures
- Query execution errors
- Validation failures

## Best Practices

1. Error Handling
- Use try-catch blocks
- Provide meaningful error messages
- Handle different types of errors appropriately

2. Pagination
- Use for large data sets
- Default limit: 10 items per page
- Maximum limit: 100 items per page

3. Data Validation
- Validate input data
- Sanitize user inputs
- Use mongoose schemas for validation

4. Security
- Input validation
- Error handling
- Rate limiting (if implemented)

## Project Structure
```
education-api/
├── config/
│   └── db.js
├── models/
│   ├── Course.js
│   ├── Quiz.js
│   └── QuizAttempt.js
├── routes/
│   ├── courseRoutes.js
│   └── quizRoutes.js
├── controllers/
│   ├── courseController.js
│   └── quizController.js
├── middleware/
│   └── errorHandler.js
├── .env
├── .gitignore
├── server.js
└── swagger.js
```
