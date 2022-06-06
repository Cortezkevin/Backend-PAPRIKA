export class Category {
    id_category?: number;
    name: string;
    description: string;
    url_image: string;
    state: string;
    constructor(id_category:number, name: string, description: string, url_image: string, state: string){
        this.id_category = id_category;
        this.name = name;
        this.description = description;
        this.url_image = url_image;
        this.state = state;
    }
}
