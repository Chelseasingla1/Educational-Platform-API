const Quiz = require('../models/Quiz');

const handleError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            details: Object.values(error.errors).map(err => err.message)
        });
    }
    if (error.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format'
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        details: error.message
    });
};

exports.createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create({
            courseId: req.params.courseId,
            ...req.body
        });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter
        const filter = { courseId: req.params.courseId };

        // Execute query with pagination
        const quizzes = await Quiz.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total documents
        const totalQuizzes = await Quiz.countDocuments(filter);

        res.json({
            status: 'success',
            data: {
                quizzes,
                currentPage: page,
                totalPages: Math.ceil(totalQuizzes / limit),
                totalQuizzes,
                resultsPerPage: limit,
                hasMore: page * limit < totalQuizzes
            }
        });
    } catch (error) {
        handleError(error, res);
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({
                status: 'error',
                message: 'Quiz not found'
            });
        }

        const { answers } = req.body;
        let score = 0;
        const results = [];

        // Validate answers format
        if (!Array.isArray(answers)) {
            return res.status(400).json({
                status: 'error',
                message: 'Answers must be provided in an array'
            });
        }

        // Calculate score and prepare feedback
        quiz.questions.forEach((question) => {
            const userAnswer = answers.find(a => a.questionId === question._id.toString());
            const isCorrect = userAnswer && userAnswer.selectedAnswer === question.correctAnswer;
            
            if (isCorrect) score++;

            results.push({
                questionId: question._id,
                correct: isCorrect,
                userAnswer: userAnswer ? userAnswer.selectedAnswer : null,
                correctAnswer: question.correctAnswer
            });
        });

        const percentage = (score / quiz.questions.length) * 100;

        res.json({
            status: 'success',
            data: {
                score,
                totalQuestions: quiz.questions.length,
                percentage,
                results,
                passed: percentage >= 60, // Optional: Add pass/fail threshold
                submittedAt: new Date()
            }
        });

    } catch (error) {
        handleError(error, res);
    }
};

exports.getQuizAttempts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const quizId = req.params.id;

        const total = await QuizAttempt.countDocuments({ quizId });
        const attempts = await QuizAttempt.find({ quizId })
            .skip(skip)
            .limit(limit)
            .sort({ submittedAt: -1 });

        res.json({
            attempts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalAttempts: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};