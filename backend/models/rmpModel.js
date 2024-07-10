const mongoose = require('mongoose');

const rmpSchema = new mongoose.Schema({
    'firstName': {
        type: String,
        required: true
    },
    'lastName': {
        type: String,
        required: true
    },
    'avgDifficulty': {
        type: Number,
        required: true
    },
    'avgRating': {
        type: Number,
        required: true
    },
    'department': {
        type: String,
        required: true
    },
})

const RMP = mongoose.model('RMP', rmpSchema);
module.exports = RMP;