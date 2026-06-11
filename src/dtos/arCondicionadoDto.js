class ArCondicionadoDTO {
    constructor(arCondicionado) {
        this.id = arCondicionado.id;
        this.sala_id = arCondicionado.sala_id;
        this.marca_modelo = arCondicionado.marca_modelo;
        this.status = arCondicionado.status;
        this.temperatura_atual = arCondicionado.temperatura_atual;
        this.codigo_ir_ligar = arCondicionado.codigo_ir_ligar;
        this.codigo_ir_desligar = arCondicionado.codigo_ir_desligar;
        this.codigo_ir_temp_23 = arCondicionado.codigo_ir_temp_23;
        this.codigo_ir_modo_cool = arCondicionado.codigo_ir_modo_cool;
    }
}

export default ArCondicionadoDTO;
