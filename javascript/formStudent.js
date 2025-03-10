import {  enableDeleteStudent } from "./student.js";

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

export const loadStudents = () => {
    // Si no hay estudiantes en localStorage, devolvemos un array vacío
    const DB = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    return DB;
}

export const save = (data) => {
    // Primero, cargamos los estudiantes existentes desde localStorage
    const DB = loadStudents();

    // Luego, agregamos el nuevo estudiante al array
    DB.push(data);

    // Finalmente, guardamos el array actualizado de estudiantes en localStorage
    localStorage.setItem("student", JSON.stringify(DB));

    // Mostramos todos los estudiantes en la tabla, no solo el nuevo
    showRowsTable(DB);

    return { status: 201, message: `Se agregó con éxito a ${data.name}` };
}

    

export const transformINputFormulary = (e)=>{
    const data= Object.fromEntries(new FormData(e.target));
    data.phone= Number(data.phone)
    data.enrol__number = Number(data.enrol__number)
    data.date_of_admision = new Date().toISOString();
    return data;
}
export const showRowsTable = (DB) => {
    // Limpiar la tabla antes de mostrar los nuevos estudiantes
    table__student.innerHTML = "";

    // Mostrar todos los estudiantes
    for (let i = 0; i < DB.length; i++) {
        const tr = document.createElement("tr");
        const tdImage = document.createElement("td");
        const imgStudent = document.createElement("img");
        imgStudent.src = "#";
        imgStudent.alt = "student";
        tdImage.append(imgStudent);

        const tdName = document.createElement("td");
        tdName.textContent = DB[i].name;

        const tdEmail = document.createElement("td");
        tdEmail.textContent = DB[i].Email;

        const tdPhone = document.createElement("td");
        tdPhone.textContent = DB[i].Phone;

        const tdEnrollNumber = document.createElement("td");
        tdEnrollNumber.textContent = DB[i].enroll__number;

        const tdDate_of_admission = document.createElement("td");
        tdDate_of_admission.textContent = DB[i].date_of_admision;

        const tdActions = document.createElement("td");
        const spanEdit = document.createElement("span");
        spanEdit.classList.add("span__edit");
        spanEdit.textContent = "✏️";
        spanEdit.dataset.id_student = i;
        spanEdit.addEventListener("click", enableFromStudent);

        const spanDelete = document.createElement("span");
        spanDelete.classList.add("span__delete");
        spanDelete.textContent = "🗑️";
        spanDelete.dataset.id_student = i; // Asegúrate de asociar el ID del estudiante
        spanDelete.addEventListener("click", enableDeleteStudent);

        tdActions.append(spanEdit, spanDelete);
        tr.append(tdImage, tdName, tdEmail, tdPhone, tdEnrollNumber, tdDate_of_admission, tdActions);
        table__student.append(tr);
    }
}




    export const edit = (data) => {
        const DB = loadStudents();
        const { id } = data;
        delete data.id;
        DB[id] = data;
    
        localStorage.setItem("student", JSON.stringify(DB)); // Corregido
        const row = table__student.querySelectorAll("tr")[id];
        row.children[1].textContent = data.name;
        row.children[2].textContent = data.Email;
        row.children[3].textContent = data.Phone;
        row.children[4].textContent = data.enroll__number;
        row.children[5].textContent = data.date_of_admision;
    
        return { status: 200, message: `Se actualizó con éxito a ${data.name} `};
    }; 