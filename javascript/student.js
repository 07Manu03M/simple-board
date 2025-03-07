import { save, transformINputFormulary, loadStudents, showRowsTable, edit } from "./formStudent.js"; 
const add__student = document.querySelector("#add__student");
const dialog__add_student = document.querySelector("#dialog__add_student")
const dialog__close = document.querySelector("#dialog__close");
const form__student = document.querySelector("#form__student")
const table__student =document.querySelector("#table__student")


/* showRowsTable(loadStudents());
    add__student.addEventListener("click", ()=>{
    dialog__add_student.showModal();
})
 */

dialog__close.addEventListener("click", ()=>dialog__add_student.close());

form__student.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = transformINputFormulary(e)
    const response = save(data);
    console.log(response);
    form__student.reset()
})  

const dialog__student_edit = document.querySelector("#dialog__student_edit");
const dialog__close_edit = document.querySelector("#dialog__close_edit");
const form__student_edit = document.querySelector("#form__student_edit");


addEventListener("DOMContentLoaded", (e)=>{
    const DB = loadStudents();
    showRowsTable(DB);
})

add__student.addEventListener("click", ()=>{
    dialog__add_student.showModal();
})

dialog__close_edit.addEventListener("click", ()=> dialog__student_edit.close());

form__student_edit.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = transformINputFormulary(e)
    const response = edit(data);
    console.log(response);
    form__student_edit.reset();
    
}) 

export const enableFromStudent = (e) => {
    const span = e.target;
    const studentId = parseInt(span.dataset.id_student);

    if (isNaN(studentId)) {
        console.error("Error: ID de estudiante inválido o no encontrado.");
        return;
    }

    const DB = loadStudents();

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

    const DB = loadStudents();
    // Eliminar el estudiante de la base de datos
    DB.splice(studentId, 1);

    // Actualizar el localStorage
    localStorage.setItem("student", JSON.stringify(DB));

    // Eliminar la fila de la tabla
    const row = span.closest("tr");
    row.remove();
    
    console.log("Estudiante eliminado correctamente.");
}
