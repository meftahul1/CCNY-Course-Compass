const mongoose = require('mongoose');

const ratingDetails = mongoose.Schema(
    {
        ratingTotal: {
            type: Number,
            required: true
        },
        ratingCount: {
            type: Number,
            required: true
        }
    }
);

const detailSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter course name']
        },
        status: {
            type: String,
            required: true,
            default: 'Not Available'
        },
        courseCode: {
            type: String,
            required: true
        },
        credits: {
            type: Number,
            required: true
        },
        enrollmentPeriod: {
            type: String,
            required: true
        },
        dayTime: {
            type: String,
            required: true
        },
        room: {
            type: String,
            required: true
        },
        instructor: {
            type: String,
        },
        description: {
            type: String,
            required: true
        },
        ratings: ratingDetails
    }
);
    
const courseSchema = mongoose.Schema(
    {
        Course: {
            type: detailSchema,
            required: true
        }
    }
)

const Courses = mongoose.model('courses', courseSchema);
module.exports = Courses;

