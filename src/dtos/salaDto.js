class SalaDTO {
    constructor(sala) {
        this.id = sala.id;
        this.setor = sala.setor;
        this.andar = sala.andar;
        this.corredor = sala.corredor;
        this.nome_sala = sala.nome_sala;
        this.capacidade = sala.capacidade;
    }
}

export default SalaDTO;
