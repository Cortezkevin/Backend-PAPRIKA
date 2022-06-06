export class Supplier {
    id_supplier?:number;
    name:string;
    address:string;
    phone:number;
    state:string;
    constructor(id_supplier:number, name:string, address:string, phone:number, state:string){
        this.id_supplier = id_supplier;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.state = state;
    }
}
