import SalaRepository from '../repositories/salaRepository.js';
import SalaDto from '../dtos/salaDto.js';

class SalaService {
    static async listar() {
        const salasDb = await SalaRepository.listar();
        const salasDto = salasDb.map(item => new SalaDto(item));
        return salasDto;
    }

    static async buscar(id) {
        const salaDb = await SalaRepository.buscar(id);
        if (!salaDb) {
            const error = new Error('Sala não encontrada');
            error.statusCode = 404;
            throw error;
        }
        const salaDto = new SalaDto(salaDb);
        return salaDto;
    }

    static async criar(salaDados) {
        // Não cadastra salas duplicadas
        const salaDuplicada = await SalaRepository.buscarPorLocalizacao(
            salaDados.setor,
            salaDados.andar,
            salaDados.nome_sala
        );

        if (salaDuplicada) {
            const error = new Error('Já existe uma sala cadastrada com este setor, andar e nome da sala');
            error.statusCode = 400;
            throw error;
        }

        const salaCriada = await SalaRepository.criar(salaDados);
        return new SalaDto(salaCriada);
    }

    static async atualizar(id, salaDados) {
        const salaAtual = await SalaRepository.buscar(id);
        if (!salaAtual) {
            const error = new Error('Sala não encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Não cadastra salas duplicadas
        const salaDuplicada = await SalaRepository.buscarPorLocalizacao(
            salaDados.setor,
            salaDados.andar,
            salaDados.nome_sala
        );

        if (salaDuplicada && salaDuplicada._id.toString() !== id.toString()) {
            const error = new Error('Já existe outra sala cadastrada com este setor, andar e nome da sala');
            error.statusCode = 400;
            throw error;
        }

        const salaAtualizada = await SalaRepository.atualizar(id, salaDados);
        return new SalaDto(salaAtualizada);
    }

    static async atualizarParcialmente(id, salaDados) {
        const salaAtual = await SalaRepository.buscar(id);
        if (!salaAtual) {
            const error = new Error('Sala não encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Descobre os valores finais da sala caso alguns não tenham sido enviados na requisição PATCH
        const setorFinal = salaDados.setor !== undefined ? salaDados.setor : salaAtual.setor;
        const andarFinal = salaDados.andar !== undefined ? salaDados.andar : salaAtual.andar;
        const nomeSalaFinal = salaDados.nome_sala !== undefined ? salaDados.nome_sala : salaAtual.nome_sala;

        // Não cadastra salas duplicadas
        const salaDuplicada = await SalaRepository.buscarPorLocalizacao(setorFinal, andarFinal, nomeSalaFinal);

        if (salaDuplicada && salaDuplicada._id.toString() !== id.toString()) {
            const error = new Error('As alterações fariam esta sala ter setor, andar e nome da sala idênticos a outra sala já existente');
            error.statusCode = 400;
            throw error;
        }

        const salaAtualizada = await SalaRepository.atualizarParcialmente(id, salaDados);
        return new SalaDto(salaAtualizada);
    }

    static async deletar(id) {
        const salaExiste = await SalaRepository.buscar(id);
        if (!salaExiste) {
            const error = new Error('Sala não encontrada');
            error.statusCode = 404;
            throw error;
        }

        await SalaRepository.deletar(id);
    }
}

export default SalaService;
