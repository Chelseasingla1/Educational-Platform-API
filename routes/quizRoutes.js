const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

/**
* @swagger
* components:
*   schemas:
*     Question:
*       type: object
*       required:
*         - question
*         - options
*         - correctAnswer
*       properties:
*         question:
*           type: string
*           description: The question text
*         options:
*           type: array
*           items:
*             type: string
*           description: Array of possible answers
*         correctAnswer:
*           type: string
*           description: The correct answer
*     
*     Quiz:
*       type: object
*       required:
*         - questions
*       properties:
*         questions:
*           type: array
*           items:
*             $ref: '#/components/schemas/Question'
*     
*     QuizSubmission:
*       type: object
*       required:
*         - answers
*       properties:
*         answers:
*           type: array
*           items:
*             type: object
*             properties:
*               questionId:
*                 type: string
*               selectedAnswer:
*                 type: string
*/

/**
* @swagger
* /api/courses/{courseId}/quizzes:
*   post:
*     summary: Create a new quiz for a course
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: courseId
*         required: true
*         schema:
*           type: string
*         description: Course ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Quiz'
*     responses:
*       201:
*         description: Quiz created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Quiz'
*       400:
*         description: Invalid request body
*       404:
*         description: Course not found
*/
router.post('/courses/:courseId/quizzes', quizController.createQuiz);

/**
* @swagger
* /api/courses/{courseId}/quizzes:
*   get:
*     summary: Get all quizzes for a course with pagination
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: courseId
*         required: true
*         schema:
*           type: string
*       - in: query
*         name: page
*         schema:
*           type: integer
*           default: 1
*       - in: query
*         name: limit
*         schema:
*           type: integer
*           default: 10
*     responses:
*       200:
*         description: List of quizzes
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 quizzes:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Quiz'
*                 currentPage:
*                   type: integer
*                 totalPages:
*                   type: integer
*       404:
*         description: Course not found
*/
router.get('/courses/:courseId/quizzes', quizController.getQuizzes);

/**
* @swagger
* /api/quizzes/{id}:
*   get:
*     summary: Get a quiz by ID
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Quiz details
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Quiz'
*       404:
*         description: Quiz not found
*/
router.get('/quizzes/:id', quizController.getQuiz);

/**
* @swagger
* /api/quizzes/{id}:
*   put:
*     summary: Update a quiz
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Quiz'
*     responses:
*       200:
*         description: Quiz updated successfully
*       404:
*         description: Quiz not found
*/
router.put('/quizzes/:id', quizController.updateQuiz);

/**
* @swagger
* /api/quizzes/{id}:
*   delete:
*     summary: Delete a quiz
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Quiz deleted successfully
*       404:
*         description: Quiz not found
*/
router.delete('/quizzes/:id', quizController.deleteQuiz);

/**
* @swagger
* /api/quizzes/{id}/submit:
*   post:
*     summary: Submit answers for a quiz
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/QuizSubmission'
*     responses:
*       200:
*         description: Quiz submission results
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 score:
*                   type: number
*                 totalQuestions:
*                   type: number
*                 percentage:
*                   type: number
*                 results:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       questionId:
*                         type: string
*                       correct:
*                         type: boolean
*                       userAnswer:
*                         type: string
*                       correctAnswer:
*                         type: string
*       404:
*         description: Quiz not found
*/
router.post('/quizzes/:id/submit', quizController.submitQuiz);

/**
* @swagger
* /api/quizzes/{id}/attempts:
*   get:
*     summary: Get quiz attempt history
*     tags: [Quizzes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*       - in: query
*         name: page
*         schema:
*           type: integer
*           default: 1
*       - in: query
*         name: limit
*         schema:
*           type: integer
*           default: 10
*     responses:
*       200:
*         description: Quiz attempts history
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 attempts:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       score:
*                         type: number
*                       totalQuestions:
*                         type: number
*                       percentage:
*                         type: number
*                       submittedAt:
*                         type: string
*                         format: date-time
*                 currentPage:
*                   type: integer
*                 totalPages:
*                   type: integer
*       404:
*         description: Quiz not found
*/
router.get('/quizzes/:id/attempts', quizController.getQuizAttempts);

module.exports = router;