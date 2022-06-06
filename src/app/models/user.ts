import { Rol } from "./rol";

export class User{

    id_user!:number;
    name:string;
    username:string;
    email:string;
    password:string;
    roles: Rol[];  

    constructor(name:string, username:string, email:string, password:string, roles: Rol[]){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}