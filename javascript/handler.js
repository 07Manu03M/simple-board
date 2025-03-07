import { deleteStudent } from "./student";

export const enableFromStudent = (e) => {
    const span = e.target;
    console.log("Elemento clickeado:", span);
    console.log("Dataset del elemento:", span.dataset);
    
    const studentId = parseInt(span.dataset.id_student);
    console.log("Student ID después de parseInt:", studentId);

    if (isNaN(studentId)) {
        console.error("Error: ID de estudiante inválido o no encontrado.");
        return;
    }

    const DB = loadStudents();
    console.log("Base de datos cargada:", DB);

    const infoStudent = DB[studentId];
    if (!infoStudent) {
        console.error("Error: No se encontró el estudiante con ID", studentId);
        return;
    }

    dialog__student_edit.showModal();
    const input = form__student_edit.querySelectorAll("input");
    for (let i = 0; i < input.length; i++) {
        if (input[i].name === "id") { 
            input[i].value = studentId;
            continue;
        }
        input[i].value = infoStudent[input[i].name] || "";
    }
};

export const enableDeleteStudent = (e) => {
    const span = e.target;
    const studentId = parseInt(span.dataset.id_student);

    if (isNaN(studentId)) {
        console.error("Error: ID de estudiante inválido o no encontrado.");
        return;
    }

    const confirmDelete = confirm("¿Estás seguro de eliminar este estudiante?");
    if (confirmDelete) {
        const response = deleteStudent(studentId);
        console.log(response.message);
    }
};