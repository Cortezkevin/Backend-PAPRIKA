export class Producto {
    id_product: number;
    category: string;
    supplier: string;
    name:string;
    mark:string;
    description:string;
    url_image:string;
    expiration_date:string;
    price:number;
    stock:number;
    state:string;
    constructor(id_product:number, category: string, supplier: string, name:string, mark:string, description:string,
        url_image:string, expiration_date:string, price:number, stock:number, state:string) {
        this.id_product = id_product;
        this.category = category;
        this.supplier = supplier;
        this.name = name;
        this.mark = mark;
        this.description = description;
        this.url_image = url_image;
        this.expiration_date = expiration_date;
        this.price = price;
        this.stock = stock;
        this.state = state;
    }
}


