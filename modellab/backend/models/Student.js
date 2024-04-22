const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    enrolledCourses: [String],
    feesPaid: Number
});

module.exports = mongoose.model('Student', studentSchema);
