import SalaService from '../services/salaService.js';

class SalaController {
    static async listar(req, res, next) {
        try {
            const salas = await SalaService.listar();
            res.status(200).json(salas);
        } catch (error) {
            next(error);
        }
    }

    static async buscar(req, res, next) {
        try {
            const { id } = req.params;
            const salaDto = await SalaService.buscar(id);
            res.status(200).json(salaDto);
        } catch (error) {
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            const salaDados = req.body;
            const novaSalaDto = await SalaService.criar(salaDados);
            res.status(201).json(novaSalaDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const salaDados = req.body;
            const salaAtualizadaDto = await SalaService.atualizar(id, salaDados);
            res.status(200).json(salaAtualizadaDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizarParcialmente(req, res, next) {
        try {
            const { id } = req.params;
            const salaDados = req.body;
            const salaAtualizadaDto = await SalaService.atualizarParcialmente(id, salaDados);
            res.status(200).json(salaAtualizadaDto);
        } catch (error) {
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            const { id } = req.params;
            await SalaService.deletar(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default SalaController;

