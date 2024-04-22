import React, { useState, useEffect } from 'react';
import './App.css';

const EnrollmentForm = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [feesPaid, setFeesPaid] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnroll = async () => {
        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    enrolledCourses,
                    feesPaid
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to enroll student');
            }
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCalculateFee = async () => {
        try {
            const response = await fetch('/api/students/calculate-fee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrolledCourses
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to calculate fee');
            }
            const data = await response.json();
            setTotalFee(data.totalFee);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/students/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setName(student.name);
        setEmail(student.email);
        setEnrolledCourses(student.enrolledCourses);
        setFeesPaid(student.feesPaid);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/students/${selectedStudent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    enrolledCourses,
                    feesPaid
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={enrolledCourses} onChange={e => setEnrolledCourses(e.target.value.split(','))} placeholder="Enrolled Courses" />
                <input type="number" value={feesPaid} onChange={e => setFeesPaid(e.target.value)} placeholder="Fees Paid" />
                {selectedStudent ? (
                    <div>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setSelectedStudent(null)}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={handleEnroll}>Enroll</button>
                )}
                <button onClick={handleCalculateFee}>Calculate Fee</button>
                <p>Total Fee: {totalFee}</p>
            </div>
            <div>
                <h2>Students</h2>
                <ul>
                    {students.map(student => (
                        <li key={student._id}>
                            <span>{student.name}</span>
                            <span>{student.email}</span>
                            <span>{student.enrolledCourses.join(', ')}</span>
                            <span>{student.feesPaid}</span>
                            <button onClick={() => handleSelectStudent(student)}>Edit</button>
                            <button onClick={() => handleDelete(student._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EnrollmentForm;
