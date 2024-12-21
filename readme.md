# 🎓 Educational Platform API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A powerful RESTful API for managing educational courses and quizzes, built with modern technologies.

[Features](#features) •
[Installation](#installation) •
[API Documentation](#api-documentation) •
[Testing](#testing)

</div>

---

## ✨ Features

🔹 **Course Management**
- Complete CRUD operations
- Detailed course information
- Chapter management

🔹 **Quiz System**
- Create and manage quizzes
- Auto-grading system
- Detailed result analysis

🔹 **Technical Features**
- RESTful API architecture
- Swagger documentation
- Pagination support
- Robust error handling

## 🛠️ Tech Stack

- 💻 **Backend**: Node.js & Express.js
- 🗄️ **Database**: MongoDB
- 📚 **Documentation**: Swagger UI
- 🧪 **Testing**: Postman

## 📋 Prerequisites

- Node.js `v14.0.0` or higher
- MongoDB `v4.4.0` or higher
- npm or yarn

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Chelseasingla1/Educational-Platform-API.git
cd education-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create `.env` file in root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/education_platform
```

4. **Database Setup**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo service mongod start
```

5. **Launch Application**
```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Documentation

### Swagger Documentation
Access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

### 🔵 Core Endpoints

#### 📖 Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/courses` | Create course |
| `GET` | `/api/courses` | List courses |
| `GET` | `/api/courses/:id` | Get course |
| `PUT` | `/api/courses/:id` | Update course |
| `DELETE` | `/api/courses/:id` | Delete course |

#### 📝 Quizzes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/courses/:courseId/quizzes` | Create quiz |
| `GET` | `/api/courses/:courseId/quizzes` | List quizzes |
| `POST` | `/api/quizzes/:id/submit` | Submit answers |

## 🧪 Testing

### Postman Setup
1. Open Postman
2. Import collection
3. Configure environment:
```json
{
  "baseUrl": "http://localhost:3000"
}
```

## 📁 Project Structure

```
education-api/
├── 📂 config/
│   └── db.js
├── 📂 models/
│   ├── Course.js
│   ├── Quiz.js
│   └── QuizAttempt.js
├── 📂 routes/
│   ├── courseRoutes.js
│   └── quizRoutes.js
├── 📂 controllers/
│   ├── courseController.js
│   └── quizController.js
├── 📂 middleware/
│   └── errorHandler.js
├── 📄 .env
├── 📄 .gitignore
├── 📄 server.js
└── 📄 swagger.js
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port | `3000` |
| `MONGODB_URI` | MongoDB connection URL | `mongodb://localhost:27017/education_platform` |

## 🚨 Error Handling

```json
{
    "status": "error",
    "message": "Error description",
    "details": ["Additional details"]
}
```

## 👨‍💻 Author

Chelsea Singla

## 🙏 Acknowledgments

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Swagger UI](https://swagger.io/tools/swagger-ui)

---

<div align="center">

Made with ❤️ and ☕

</div>