import {users, validation} from "./credenciales.js";
import { findDataByForm } from "./formSignin.js";

const form__login = document.querySelector("#form__login");
const dialog__login = document.querySelector("#dialog__login")
const dialog__login_close = document.querySelector("#dialog__login_close")

form__login.addEventListener("submit", findDataByForm)
dialog__login_close.addEventListener("click", (e) => dialog__login.close())  

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