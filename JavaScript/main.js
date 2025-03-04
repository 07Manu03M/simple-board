import {users, validation} from "./credenciales.js";
const form__login = document.querySelector("#form__login");
form__login.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))
    console.log(validation(users, data));
})

window.addEventListener('load', function () {

    let input = document.getElementById('name');

    input.addEventListener('focus', function () {
        this.classList.add('isEmpty');
    });


    input.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('isEmpty');
        }
    });

});


window.addEventListener('load', function () {

    let input = document.getElementById('names');

    input.addEventListener('focus', function () {
        this.classList.add('isempty');
    });


    input.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('isempty');
        }
    });

});


