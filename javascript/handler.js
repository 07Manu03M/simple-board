import {loadStudent} from "./formStudent.js";

export const enableFromStudentToEdit = (e)=>{
    const span = e.target;
    const DB = loadStudent();
    const infoStudent = DB[span.dataset.id_student];
    dialog__student_edit.showModal();
    const input = form__student_edit.querySelectorAll("input");
    for (let i = 0; i < input.length; i++) {
        if(input[i].name == "id"){ input[i].value = span.dataset.id_student; continue};
        // if(input[i].name == "date_of_admission") { 
        //     const date = new Date(infoStudent[input[i].name]);
        //     const year = date.getFullYear();
        //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11, sumamos 1
        //     const day = String(date.getDate()).padStart(2, '0'); // Agregar cero si es menor a 10
        //     input[i].value = `${year}-${month}-${day}`;
        //     continue;
        // }
        input[i].value = infoStudent[input[i].name];
    }
}

export const enableFromStudentToDelete = (e)=>{
    const input = form__student_delete.querySelector("input[name='id']");
    const strong = form__student_delete.querySelector("strong");
    input.value = e.target.dataset.id_student;
    strong.textContent = e.target.dataset.name_student;
    dialog__student_delete.showModal();
}