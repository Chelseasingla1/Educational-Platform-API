# How to Use Our Educational Platform API

Our Educational Platform API provides a robust interface for managing educational content, courses, and quizzes. This REST API allows you to create and manage courses, handle quizzes, and track student progress programmatically.

## What is this API for?

The Educational Platform API enables you to:
- Create and manage educational courses
- Add and organize course chapters
- Create quizzes for courses
- Handle quiz submissions and grading
- Track student progress and performance

## Working with the API

### Base URL
All API requests should be made to:
```
http://localhost:3000/api
```

### Content Type
The API expects and returns JSON data. Always include the header:
```
Content-Type: application/json
```

## Core Features

### 1. Course Management

Create a new course using the Courses API:

```javascript
// Using Node.js and Axios
const axios = require('axios');

async function createCourse() {
  try {
    const response = await axios.post('http://localhost:3000/api/courses', {
      category: "CBSE",
      chapters: [{
        title: "Introduction to Python",
        description: "Basic concepts of Python programming",
        duration: 60
      }],
      description: "Complete Python Course",
      duration: 300,
      instructorName: "John Doe",
      language: "English",
      level: "beginner",
      price: 99.99
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

Example Response:
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "category": "CBSE",
    "chapters": [{
      "title": "Introduction to Python",
      "description": "Basic concepts of Python programming",
      "duration": 60
    }],
    "description": "Complete Python Course",
    "createdAt": "2024-12-19T10:00:00.000Z"
  }
}
```

### 2. Quiz Management

Create a quiz for a course:

```javascript
async function createQuiz(courseId) {
  try {
    const response = await axios.post(`http://localhost:3000/api/courses/${courseId}/quizzes`, {
      questions: [
        {
          question: "What is Python?",
          options: ["Programming Language", "Text Editor", "Database", "Web Server"],
          correctAnswer: "Programming Language"
        }
      ]
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

## API Endpoints Reference

### Courses API

#### Create a Course
```http
POST /api/courses
```

Required Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Course category (e.g., "CBSE") |
| description | string | Course description |
| duration | number | Total duration in minutes |
| instructorName | string | Name of the instructor |

#### List Courses
```http
GET /api/courses?page=1&limit=10
```

Optional Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| category | string | Filter by category |

#### Get Specific Course
```http
GET /api/courses/:id
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Course ID |

Example Response:
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "category": "CBSE",
    "description": "Complete Python Course",
    "duration": 300,
    "instructorName": "John Doe",
    "language": "English",
    "level": "beginner",
    "price": 99.99,
    "status": "published",
    "visibility": "public",
    "chapters": [...]
  }
}
```

#### Update Course
```http
PUT /api/courses/:id
```

**Request Body:**
```json
{
  "description": "Updated course description",
  "duration": 360,
  "price": 149.99,
  "status": "published"
}
```

Example Response:
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "description": "Updated course description",
    "duration": 360,
    "price": 149.99,
    "status": "published",
    ...
  }
}
```

#### Delete Course
```http
DELETE /api/courses/:id
```

Example Response:
```json
{
  "status": "success",
  "message": "Course deleted successfully"
}
```

### Quiz API

#### Create a Quiz
```http
POST /api/courses/:courseId/quizzes
```

Required Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| questions | array | Array of question objects |
| courseId | string | ID of the associated course |

## Error Handling

The API uses standard HTTP response codes:

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request |
| 404 | Resource not found |
| 500 | Server error |

Example Error Response:
```json
{
  "status": "error",
  "message": "Course not found",
  "details": ["No course exists with the provided ID"]
}
```

#### Get All Quizzes for a Course
```http
GET /api/courses/:courseId/quizzes
```

Optional Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

Example Response:
```json
{
  "status": "success",
  "data": {
    "quizzes": [...],
    "currentPage": 1,
    "totalPages": 3,
    "totalQuizzes": 25
  }
}
```

#### Get Specific Quiz
```http
GET /api/quizzes/:id
```

Example Response:
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "courseId": "507f1f77bcf86cd799439011",
    "questions": [
      {
        "question": "What is Python?",
        "options": ["Programming Language", "Text Editor", "Database", "Web Server"],
        "correctAnswer": "Programming Language"
      }
    ]
  }
}
```

#### Update Quiz
```http
PUT /api/quizzes/:id
```

**Request Body:**
```json
{
  "questions": [
    {
      "question": "Updated question",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1"
    }
  ]
}
```

#### Delete Quiz
```http
DELETE /api/quizzes/:id
```

#### Submit Quiz Answers
```http
POST /api/quizzes/:id/submit
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "507f1f77bcf86cd799439013",
      "selectedAnswer": "Programming Language"
    }
  ]
}
```

Example Response:
```json
{
  "status": "success",
  "data": {
    "score": 1,
    "totalQuestions": 1,
    "percentage": 100,
    "results": [
      {
        "questionId": "507f1f77bcf86cd799439013",
        "correct": true,
        "userAnswer": "Programming Language",
        "correctAnswer": "Programming Language"
      }
    ],
    "passed": true,
    "submittedAt": "2024-12-19T10:00:00.000Z"
  }
}
```

#### Get Quiz Attempts
```http
GET /api/quizzes/:id/attempts
```

Optional Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

Example Response:
```json
{
  "status": "success",
  "data": {
    "attempts": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "quizId": "507f1f77bcf86cd799439012",
        "score": 80,
        "totalQuestions": 10,
        "percentage": 80,
        "submittedAt": "2024-12-19T10:00:00.000Z"
      }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalAttempts": 1
  }
}
```


## Best Practices

1. **Pagination**
   - Always use pagination for list endpoints
   - Default page size is 10 items
   ```http
   GET /api/courses?page=1&limit=10
   ```

2. **Error Handling**
   ```javascript
   try {
     const response = await makeApiRequest();
   } catch (error) {
     if (error.response.status === 404) {
       console.log('Resource not found');
     }
   }
   ```

3. **Data Validation**
   - Validate all inputs before sending
   - Check required fields
   - Verify data types

## Quick Start Guides

Node.js Implementation
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create a course
const course = await api.post('/courses', {
  category: 'CBSE',
  description: 'New Course',
  duration: 120,
  instructorName: 'John Doe'
});
```

## Testing the API

We provide a comprehensive Postman collection for testing. To use it:

1. Import the collection into Postman
2. Set up your environment variables:
   - `baseUrl`: `http://localhost:3000`
3. Start testing endpoints

For detailed testing guides and example code in other languages, visit our GitHub repository.