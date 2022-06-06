export class NewUser {
    name: string;
    username: string;
    email: string;
    password: string;
    authorities: string[];
    constructor(name: string,
        username: string,
        email: string,
        password: string,
        authorities: string[]){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }
}
 