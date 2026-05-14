import ArCondicionadoRepository from "../repositories/arCondicionadoRepository.js";
import SalaRepository from "../repositories/salaRepository.js";
import ArCondicionadoDto from "../dtos/arCondicionadoDto.js";

class ArCondicionadoService {
    static async listar() {
        const arCondicionadosDb = await ArCondicionadoRepository.listar();
        const arCondicionadosDto = arCondicionadosDb.map(item => new ArCondicionadoDto(item));
        return arCondicionadosDto;
    }

    static async buscar(id) {
        const arCondicionadoDb = await ArCondicionadoRepository.buscar(id);
        if (!arCondicionadoDb) {
            const error = new Error('Ar-condicionado não encontrado');
            error.statusCode = 404;
            throw error;
        }
        const arCondicionadoDto = new ArCondicionadoDto(arCondicionadoDb);
        return arCondicionadoDto;
    }

    static async criar(arCondicionadoDados) {
        // Verifica se a sala existe
        const salaExiste = await SalaRepository.buscar(arCondicionadoDados.sala_id);
        if (!salaExiste) {
            const error = new Error('Sala não encontrada');
            error.statusCode = 404;
            throw error;
        }

        const arCondicionadoCriado = await ArCondicionadoRepository.criar(arCondicionadoDados);
        return new ArCondicionadoDto(arCondicionadoCriado);
    }

    static async atualizar(id, arCondicionadoDados) {
        // Verifica se o ar condicionado existe
        const arCondicionadoAtual = await ArCondicionadoRepository.buscar(id);
        if (!arCondicionadoAtual) {
            const error = new Error('Ar-condicionado não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Validação de sala existente (caso esteja alterando a sala)
        if (arCondicionadoDados.sala_id !== undefined && String(arCondicionadoDados.sala_id) !== String(arCondicionadoAtual.sala_id)) {
            const salaExiste = await SalaRepository.buscar(arCondicionadoDados.sala_id);
            if (!salaExiste) {
                const error = new Error('Sala não encontrada');
                error.statusCode = 404;
                throw error;
            }
        }

        const arCondicionadoAtualizado = await ArCondicionadoRepository.atualizar(id, arCondicionadoDados);
        return new ArCondicionadoDto(arCondicionadoAtualizado);
    }

    static async atualizarParcialmente(id, arCondicionadoDados) {
        // Verifica se o ar condicionado existe
        const arCondicionadoAtual = await ArCondicionadoRepository.buscar(id);
        if (!arCondicionadoAtual) {
            const error = new Error('Ar-condicionado não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Validação de sala existente (caso esteja alterando a sala)
        if (arCondicionadoDados.sala_id !== undefined && String(arCondicionadoDados.sala_id) !== String(arCondicionadoAtual.sala_id)) {
            const salaExiste = await SalaRepository.buscar(arCondicionadoDados.sala_id);
            if (!salaExiste) {
                const error = new Error('Sala não encontrada');
                error.statusCode = 404;
                throw error;
            }
        }

        const arCondicionadoAtualizado = await ArCondicionadoRepository.atualizarParcialmente(id, arCondicionadoDados);
        return new ArCondicionadoDto(arCondicionadoAtualizado);
    }

    static async deletar(id) {
        const arCondicionadoExiste = await ArCondicionadoRepository.buscar(id);
        if (!arCondicionadoExiste) {
            const error = new Error('Ar-condicionado não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await ArCondicionadoRepository.deletar(id);
    }
}

export default ArCondicionadoService;
