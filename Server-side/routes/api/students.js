const express = require("express");
const Student = require("../../models/Student");
const User = require("../../models/User");
const router = express.Router();

const validateStudentMarks = require('../../validation/students');

router.post(
    "/", 
    async (req, res, next) => {
        const { errors, isValid } = validateStudentMarks(req.body);
        
        if(!isValid)
            res.status(400).json(errors)
        
        console.log(req.user)

        console.log("student marks", req.body)

        const name = req.body.firstName;
        const subjectName = req.body.subject;
        const marks = req.body.marks

        let subObj = {
            name: subjectName,
            marks: marks
        }

        Student.findOne({
            studentOf: req.user._id,
            name: name,            
        }).then(async student => {

            if(!student) {
                const newStudentMarks = new Student({
                    name: name,
                    studentOf: req.user._id
                })

                newStudentMarks.subjects.push(subObj)

                await newStudentMarks.save()

                await User.updateOne(
                    { _id: req.user._id },
                    { $push: { students: newStudentMarks._id } }
                )
            } else {

                student.subjects.forEach(sub => {
                    if(sub.name === subObj.name) {
                        sub.marks = sub.marks + +req.body.marks
                    } 

                    if(sub.name !== subObj.name) {
                        student.subjects.push(subObj)
                    }
                })

                await student.save();

            }

        })

        let user = await User.findById(req.user._id)

        res.json({
            user
        })

        // Student
        //     .findOneAndUpdate(
        //         { _id: newStudentMarks._id },
        //         { $push: { subjects: subObj } }
        //     )
        //     .then(student => res.json(student) )
        //     .catch(err => console.log(err))

    }
)

module.exports = router;