const students = [
    { name: "Ragav", age: 13 },
    { name: "Sam", age: 14 },
    { name: "John", age: 12 },
    { name: "Greg", age: 13 }
];

document.getElementById("viewBtn").addEventListener("click", viewStudents);
document.getElementById("addBtn").addEventListener("click", addStudent);

function viewStudents() {
    const container = document.getElementById("studentsContainer");
    container.innerHTML = ""; 
    students.forEach((student, index) => {
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student");
        studentDiv.textContent = `Name: ${student.name}, Age: ${student.age}`;
        container.appendChild(studentDiv);
    });
}

function addStudent() {
    const name = prompt("Enter name:");
    const age = parseInt(prompt("Enter age:"));
    if (!name || isNaN(age)) {
        return;
    }
    const newStudent = { name: name, age: age };
    students.push(newStudent);
    viewStudents(); 
}


document.getElementById("studentsContainer").addEventListener("mouseover", function(event) {
    if (event.target.classList.contains("student")) {
        event.target.style.backgroundColor = "#f7f7f7"; 
    }
});


document.getElementById("studentsContainer").addEventListener("mouseout", function(event) {
    if (event.target.classList.contains("student")) {
        event.target.style.backgroundColor = "#fff"; 
    }
});

