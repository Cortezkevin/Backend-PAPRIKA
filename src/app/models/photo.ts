export class Photo {
    id_photo !: number;
    file : string;
    user: string;

    constructor(file:string, user:string){
        this.file = file;
        this.user = user;
    }
}
