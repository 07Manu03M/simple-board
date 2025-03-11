const ENV= async()=>{
    let peticion= await fetch("../enviriment.json")
    let data= await peticion.json();
    /* console.log(data); */
    return data
}

export const validation = (users, data)=>{
    for (let i = 0; i < users.length; i++){
        if (users[i].user === data.email) {
            if (users[i].PWD === data.pasword){
                const {USER:email_user, ROL:type_user} = users[i];
                return {status:200, email_user, type_user}
            }
            else return{status:401, message: "contraseña incorrecta :c"};
        }
    }
    
    return {status: 404, message: "Usuario incorrecto :c"}
}

export const users = await ENV()