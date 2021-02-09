const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: String,
    marks: Number
})

const studentSchema = new Schema({
    name: String,
    subjects: [subjectSchema],
    studentOf: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

module.exports = Student = mongoose.model("students", studentSchema);