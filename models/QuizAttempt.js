// models/QuizAttempt.js
const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answers: [{
        questionId: String,
        selectedAnswer: String,
        isCorrect: Boolean
    }],
    score: Number,
    totalQuestions: Number,
    percentage: Number,
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);