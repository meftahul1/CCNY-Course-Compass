const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const allCourses = require('./Fall24Courses.json');
const Courses = require('./models/courseModel.js');
const RMP = require('./models/rmpModel.js');
const allRatings = require('./CCNYProf.json');

//coursesJsonToDatabase(); uncommented since not used 
//rmpJsonToDatabase(); uncommented to prevent duplicate entries

async function rmpJsonToDatabase () {
    
    for (const key in allRatings['First Name']) {
        const firstName = allRatings['First Name'][key];
        const lastName = allRatings['Last Name'][key];
        const department = allRatings['Department'][key];
        const avgRating = allRatings['Avg Rating'][key];
        const avgDifficulty = allRatings['Avg Difficulty'][key];
        const newRMP = new RMP({
            'firstName': firstName,
            'lastName': lastName,
            'department': department,
            'avgRating': avgRating,
            'avgDifficulty': avgDifficulty
        });
        console.log(newRMP);
        //newRMP.save(); uncommented to prevent duplicate entries
    }
}

async function coursesJsonToDatabase () {
    const dbCourses = await Courses.find();
    dbCourseNames = [];
    dbCourses.forEach(course => {
        dbCourseNames.push(course.Course['name'])
    });

    for (const key in allCourses['Name']) {
        if (dbCourseNames.includes(allCourses['Name'][key])) {
            console.log(`${allCourses['Name'][key]} already exists in the database`)
            continue;
        } 
        else {
            const course = {
                'name': allCourses['Name'][key],
                'status': allCourses['Status'][key],
                'courseCode': allCourses['Course Code'][key],
                'credits': allCourses['Credits'][key],
                'enrollmentPeriod': allCourses['Enrollment Period'][key],
                'dayTime': allCourses['Day Time'][key],
                'room': allCourses['Room'][key],
                'instructor': allCourses['Instructor'][key],
                'description': allCourses['Description'][key],
                'ratings': {
                    'ratingTotal': 0,
                    'ratingCount': 0
                }
            };
            const newCourse = new Courses({
                'Course': course
            });
            console.log(newCourse);
            newCourse.save();
        }
    }
}