const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const chatSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true
    },
    messages: [messageSchema]
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;