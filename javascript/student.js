import {save,edit, transformInputFormulary, loadStudent, showRowsTable} from "./formStudent.js";

const add__student = document.querySelector("#add__student");
const dialog__add_student = document.querySelector("#dialog__add_student");
const dialog__student_edit = document.querySelector("#dialog__student_edit");
const dialog__close = document.querySelector("#dialog__close");
const dialog__close_edit = document.querySelector("#dialog__close_edit");
const dialog__student_delete = document.querySelector("#dialog__student_delete");
const form__student = document.querySelector("#form__student");
const form__student_edit = document.querySelector("#form__student_edit");
const form__student_delete = document.querySelector("#form__student_delete");
const table__student = document.querySelector("#table__student")


addEventListener("DOMContentLoaded", (e)=>{
    const DB = loadStudent();
    showRowsTable(DB);
})


add__student.addEventListener("click", ()=>{
    dialog__add_student.showModal();
})

dialog__close.addEventListener("click", ()=> dialog__add_student.close());
dialog__close_edit.addEventListener("click", ()=> dialog__student_edit.close());

form__student.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = transformInputFormulary(e)
    const response = save(data);
    console.log(response);
    form__student.reset();
})
form__student_edit.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = transformInputFormulary(e)
    const response = edit(data);
    console.log(response);
    form__student_edit.reset();
    
})

form__student_delete.addEventListener("submit", (e)=>{
    e.preventDefault();
    const actions = e.submitter.dataset.action; // delete o close
    if(actions == "close") dialog__student_delete.close();
    if(actions == "delete"){
        const data = Object.fromEntries(new FormData(e.target));
        const DB = loadStudent();
        DB.splice(data.id, 1);
        localStorage.setItem("students", JSON.stringify(DB));
        table__student.innerHTML = "";
        showRowsTable(DB);
        form__student_delete.reset();
        dialog__student_delete.close();
    }
})
