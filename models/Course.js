const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    description: String,
    videoLink: String,
    duration: Number
});

const courseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    chapters: [chapterSchema],
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    instructorName: { type: String, required: true },
    language: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    visibility: { type: String, enum: ['public', 'private'], default: 'private' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);