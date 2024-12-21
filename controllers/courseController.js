const Course = require('../models/Course');

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

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Filtering
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.language) filter.language = req.query.language;
        if (req.query.level) filter.level = req.query.level;
        if (req.query.status) filter.status = req.query.status;

        // Search functionality
        if (req.query.search) {
            filter.$or = [
                { description: { $regex: req.query.search, $options: 'i' } },
                { instructorName: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        // Execute query with pagination
        const courses = await Course.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total documents
        const totalCourses = await Course.countDocuments(filter);

        res.json({
            status: 'success',
            data: {
                courses,
                currentPage: page,
                totalPages: Math.ceil(totalCourses / limit),
                totalCourses,
                resultsPerPage: limit,
                hasMore: page * limit < totalCourses
            }
        });
    } catch (error) {
        handleError(error, res);
    }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
