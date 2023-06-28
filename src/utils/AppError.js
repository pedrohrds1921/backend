export class AppError{
    mensage
    statuscode
    constructor(mensage,statuscode=400){
        this.mensage=mensage
        this.statuscode=statuscode
    }
}