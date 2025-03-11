import {users,validation} from "./credenciales.js"
import { dialogMessage } from "./dialogSignin.js"
export const findDataByForm =(e)=>{
    e.preventDefault();
        const data= Object.fromEntries(new FormData(e.target));
        const response= validation(users, data);
        dialogMessage(response);
        form__login.reset();
}