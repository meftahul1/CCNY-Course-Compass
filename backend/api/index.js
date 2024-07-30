require('dotenv').config({path: './api/.env'});
const uri = process.env.MONGO_URI;
const express = require('express');
const admin = require('../config/firebaseAdmin.js');
const Courses = require('../models/courseModel.js');
const RMP = require('../models/rmpModel.js');
const Users = require('../models/userModel.js');
const Chat = require('../models/chatModel.js');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(uri);

const app = express();

app.use(express.json());
app.use(
    cors({
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
      origin: '*'
    })
  );
  
app.use(express.static('public'));

app.get('/', (req, res) => {
    htmlCode = `<h1>CCNY Course API to retrieve course details for Fall 2024</h1> 
    <br>
    <h2>For JSON body of adding a course, it follows the structure</h2>
    <h3>PLEASE NOTE YOU DO NOT NEED ALL FIELDS TO TEST OUT API</h3>
    <p>{
        'name': string value,
        'status': string value,
        'courseCode': string value,
        'credits': number value,
        'enrollmentPeriod': string value,
        'dayTime': string value,
        'room': string value,
        'instructor': string value,
        'description': string value
    </p>
    <h2>For the JSON body of updating a course, it follows the structure</h2>
    <h3>YOU NEED 'searchName', everything else is optional</h3>
    <p>{
        'searchName': string value,
        'name': string value,
        'status': string value,
        'courseCode': string value,
        'credits': number value,
        'enrollmentPeriod': string value,
        'dayTime': string value,
        'room': string value,
        'instructor': string value,
        'description': string value
    </p>
    <h2>For JSON body of getting related courses and deleting a course use the following:</h2>
    <p>{
        'name': string value
    }
    </p>
    <br>
    <h2>Endpoints:</h2>
    <ul>
        <li>GET /courses - Get all course codes</li>
        <li>GET /courses/:courseID - Get course details for a specific course based on Course Code</li>
        <li>POST /courses/course-details - Get related courses based on course name</li>
        <li>POST /courses/add-course - Add a new course</li>
        <li>POST /courses/update-course - Update an existing course</li>
        <li>DELETE /courses/delete-course - Delete an existing course</li>
    </ul>`;
    res.send(htmlCode);
});

/*
app.get('/courses', async(req, res) => {
    const dbCourses = await Courses.find({});
    const courses = {};
    dbCourses.forEach(course => {
        courses[course.Course['courseCode']] = course.Course['name'];
    });
    res.json(courses);
});*/

app.get('/courses/:courseID', async (req, res) => {
    const courseID = req.params.courseID;
    const course = await Courses.findOne({'Course._id': courseID});
    res.json(course);
});

app.post('/course-details', async (req, res) => {
    const name = req.body.name;
    const courses = await findRelatedCourses(name.toLowerCase());
    //const data = Object.assign({}, courses)
    res.json(courses);
});

app.post('/add-rating/:courseID', async (req, res) => {
    const userID = req.body.userID;
    const courseID = req.params.courseID;
    const newRating = req.body.rating; 

    if (newRating == null) {
        return res.status(400).json({ message: 'Rating is required' });
    }

    try {
        const course = await Courses.findById(courseID);
        const user = await Users.findOne({"userID": userID});
        user.ratings.push({"courseID": courseID, "rating": newRating});
        user.save();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const { ratingTotal, ratingCount } = course.Course.ratings;

        
        const updatedRatingTotal = ratingTotal + newRating;
        const updatedRatingCount = ratingCount + 1;

        course.Course.ratings.ratingTotal = updatedRatingTotal;
        course.Course.ratings.ratingCount = updatedRatingCount;

        await course.save();
        res.status(200).json({ message: 'Rating added' });
        
    } catch (error) {
        console.error('Error calculating average rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/average-rating/:courseID', async (req, res) => {
    const courseID = req.params.courseID;

    try {
        const course = await Courses.findById(courseID);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const { ratingTotal, ratingCount } = course.Course.ratings;

        if (ratingCount === 0) {
            return res.status(400).json({ message: 'No ratings available for this course' });
        }

        const averageRating = ratingTotal / ratingCount;

        res.status(200).json({ averageRating });
    } catch (error) {
        console.error('Error calculating average rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/add-user-course/:courseID', async (req, res) => {
    const userID = req.body.userId;
    console.log(userID) 
    const courseID = req.params.courseID;
    
    try {
        const course = await Courses.findOne({"Course._id": courseID});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const user = await Users.findOne({"userID": userID});
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        user.courses.push(courseID);
        user.save();
        res.status(200).json({ message: 'Course added to User' });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/delete-user-course/:courseID', async (req, res) => {
    const userID = req.body.userID;
    const courseID = req.params.courseID;

    try {
        const course = await Courses.findById(courseID);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const user = await Users.findOne({"userID": userID});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.courses = user.courses.filter(course => course !== courseID);
        user.save();
        res.status(200).json({ message: 'Course removed from User' });
    } catch (error) {
        console.error('Error removing course:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/get-user-info', async (req, res) => {
    const userID = req.body.userID;

    try {
        const user = await Users.findOne({"userID": userID});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/rmp-details/', async (req, res) => {
    const professorName = req.body.professorName;
    const dbRatings = await RMP.find({});
    const names = professorName.split(' ')
    let rating;
    dbRatings.forEach(rmp => {
        if (rmp.firstName.toLowerCase() == names[0].toLowerCase() && rmp.lastName.toLowerCase() == names[names.length-1].toLowerCase()) {
            console.log(rmp)
            rating = rmp;
        }
    });
    if (!rating) {
        res.status(404).json({ message: 'Rating not found' });
    } else {
        res.json(rating);
    }
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });
      const newUser = new Users({
        userID: userRecord.uid,
        username: username,
        ratings: [],
        courses: []
      });
      newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: userRecord });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await admin.auth().getUserByEmail(email);
      const userID = user.uid;
      res.status(200).json({ userID });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });

app.post('/add-message/', async (req, res) => {
    const { username, message, courseID } = req.body;
    const timestamp = Date.now(); 
    const chat = await Chat.findOne({ "courseID": courseID }); 
    if (chat) {
        chat.messages.push({
            "sender": username,
            message: message,
            time: timestamp
        });
        chat.save();
    } else {
        const newChat = new Chat({
        "courseID": courseID,
        "messages": [{
            "sender": username,
            message: message,
            time: timestamp
        }]
        });
        newChat.save();
    }
    return res.status(201).json({ message: 'Message added' });
});

app.get('/get-messages/:courseID', async (req, res) => {
    const courseID = req.params.courseID;
    const chat = await Chat.findOne({"courseID": courseID});
    if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
    }
    return res.status(200).json(chat.messages);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = app;

async function findRelatedCourses(name) {
    const relatedCourses = [];
    const dbCourses = await Courses.find({});
    dbCourses.forEach(course => {
        const courseName = course.Course['name'].toLowerCase();
        if (courseName.includes(name)) {
            relatedCourses.push(course.Course)
        }
    });
    return relatedCourses;
}