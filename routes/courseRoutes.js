// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *           description: Chapter title
 *         description:
 *           type: string
 *           description: Chapter description
 *         duration:
 *           type: number
 *           description: Duration in hours
 *         videoLink:
 *           type: string
 *           description: URL of the video content
 *     
 *     Course:
 *       type: object
 *       required:
 *         - category
 *         - description
 *         - duration
 *         - instructorName
 *         - language
 *         - level
 *         - price
 *       properties:
 *         category:
 *           type: string
 *           description: Course category (e.g., CBSE)
 *         chapters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Chapter'
 *         description:
 *           type: string
 *         duration:
 *           type: number
 *           description: Total course duration in hours
 *         instructorName:
 *           type: string
 *         language:
 *           type: string
 *         level:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         price:
 *           type: number
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           default: draft
 *         visibility:
 *           type: string
 *           enum: [public, private]
 *           default: private
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
router.post('/courses', courseController.createCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with pagination
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCourses:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get('/courses', courseController.getCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get('/courses/:id', courseController.getCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
router.put('/courses/:id', courseController.updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;