class ArCondicionadoDTO {
    constructor(arCondicionado) {
        this.id = arCondicionado.id;
        this.sala_id = arCondicionado.sala_id;
        this.marca_modelo = arCondicionado.marca_modelo;
        this.status = arCondicionado.status;
        this.temperatura_atual = arCondicionado.temperatura_atual;
    }
}

export default ArCondicionadoDTO;
