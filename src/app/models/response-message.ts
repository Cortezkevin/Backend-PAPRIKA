export class ResponseMessage {
    respuesta:boolean;
    mensaje:string;
    fecharespuesta:Date;
    constructor(respuesta:boolean,
        mensaje:string,
        fecharespuesta:Date){
        this.respuesta = respuesta;
        this.mensaje = mensaje;
        this.fecharespuesta = fecharespuesta;
    }
}
