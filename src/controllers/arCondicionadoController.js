import ArCondicionadoService from '../services/arCondicionadoService.js';

class ArCondicionadoController {
    static async listar(req, res, next) {
        try {
            const arCondicionados = await ArCondicionadoService.listar();
            res.status(200).json(arCondicionados);
        } catch (error) {
            next(error);
        }
    }

    static async buscar(req, res, next) {
        try {
            const { id } = req.params;
            const arCondicionadoDto = await ArCondicionadoService.buscar(id);
            res.status(200).json(arCondicionadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            const arCondicionadoDados = req.body;
            const novoArCondicionadoDto = await ArCondicionadoService.criar(arCondicionadoDados);
            res.status(201).json(novoArCondicionadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const arCondicionadoDados = req.body;
            const arCondicionadoDto = await ArCondicionadoService.atualizar(id, arCondicionadoDados);
            res.status(200).json(arCondicionadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizarParcialmente(req, res, next) {
        try {
            const { id } = req.params;
            const arCondicionadoDados = req.body;
            const arCondicionadoDto = await ArCondicionadoService.atualizarParcialmente(id, arCondicionadoDados);
            res.status(200).json(arCondicionadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            const { id } = req.params;
            await ArCondicionadoService.deletar(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default ArCondicionadoController;
