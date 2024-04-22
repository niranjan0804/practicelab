const Student = require('../models/Student');

// Controller for fetching all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for fetching a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for creating a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, email, enrolledCourses, feesPaid } = req.body;
        const newStudent = await Student.create({ name, email, enrolledCourses, feesPaid });
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for updating student details
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for deleting a student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
