import {enableFromStudentToEdit, enableFromStudentToDelete} from "./handler.js";

export const loadStudent = ()=>{
    const DB = (localStorage.getItem("students")) ? JSON.parse(localStorage.getItem("students")) : [];
    return DB;
}
export const save = (data)=>{
    const DB = loadStudent();
    DB.push(data);
    showRowsTable([data]);
    localStorage.setItem("students", JSON.stringify(DB));
    return {status: 201, message: `El estudiante ${data.name} fue registrado exitosamente.`}
}
export const edit = (data)=>{
    const DB = loadStudent(); // [{name: "Miguel"},{name "Juan"}]
    const {id} = data;  // {id: 1, name:"JUAN"} - const id = 1
    delete data.id; // {name:"JUAN"}
    DB[id] = data; // {name "Juan"} = {name:"JUAN"}
    localStorage.setItem("students", JSON.stringify(DB));
    const row = table__student.querySelectorAll("tr")[id];
    row.children[1].textContent = data.name;
    row.children[2].textContent = data.email;
    row.children[3].textContent = data.phone;
    row.children[4].textContent = data.enroll_number;
}

export const transformInputFormulary =  (e)=>{
    const data = Object.fromEntries(new FormData(e.target));
    data.phone = Number(data.phone)
    data.enroll_number = Number(data.enroll_number)
    data.date_of_admission = new Date().toISOString();
    return data;
}
export const showRowsTable = (DB)=>{
    for (let i = 0; i < DB.length; i++) {
        const tr = document.createElement("tr")
        const tdImage = document.createElement("td");
        const imgStudent = document. createElement("img");
        imgStudent.src = "#"
        imgStudent.alt = "student";
        tdImage.append(imgStudent);
        const tdName = document.createElement("td");
        tdName.textContent = DB[i].name;
        const tdEmail = document.createElement("td");
        tdEmail.textContent = DB[i].email;
        const tdPhone = document.createElement("td");
        tdPhone.textContent = DB[i].phone;
        const tdEnrollNumber = document.createElement("td");
        tdEnrollNumber.textContent = DB[i].enroll_number;
        const tdDate_of_admission = document.createElement("td");
        tdDate_of_admission.textContent = DB[i].date_of_admission;
        const tdActions = document.createElement("td");
        const spanEdit = document.createElement("span");
        spanEdit.classList.add("span__edit");
        spanEdit.textContent = "✏️";
        spanEdit.dataset.id_student = i;
        spanEdit.addEventListener("click", enableFromStudentToEdit)

        const spanDelete = document.createElement("span");
        spanDelete.classList.add("span__delete");
        spanDelete.textContent = "🗑️";
        spanDelete.dataset.id_student = i;
        spanDelete.dataset.name_student = DB[i].name;
        spanDelete.addEventListener("click", enableFromStudentToDelete)

        tdActions.append(spanEdit, spanDelete);
        tr.append(tdImage, tdName, tdEmail, tdPhone, tdEnrollNumber, tdDate_of_admission, tdActions);
        table__student.append(tr);
    }

    //         <tr>
    //             <td><img src="#" alt="student"></td>
    //             <td>Karthi</td>
    //             <td>karthi@gmmail.com</td>
    //             <td>7305477760</td>
    //             <td>1234567305477760</td>
    //             <td>08-Dec, 2021</td>
    //             <td class="td__actions">
    //                 <span class="span__edit">✏️</span>
    //                 <span class="span__delete">🗑️</span>
    //             </td>
    //         </tr>

}