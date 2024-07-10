const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    "courseID": {
        type: String
    }, 
    "rating": {
        type: Number
    }
})

const userSchema = new mongoose.Schema({
    "userID": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true
    },
    "ratings": [ratingSchema],
    "courses": [String]
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;