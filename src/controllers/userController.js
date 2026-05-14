import UserService from '../services/userService.js'

class UserController {
    static async listar(req, res, next) {
        try {
            const users = await UserService.listar();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async buscar(req, res, next) {
        try {
            const { id } = req.params;
            const userDto = await UserService.buscar(id);
            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            const userDados = req.body;
            const novoUserDto = await UserService.criar(userDados);
            res.status(201).json(novoUserDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const userDados = req.body;
            const userAtualizadoDto = await UserService.atualizar(id, userDados);
            res.status(200).json(userAtualizadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async atualizarParcialmente(req, res, next) {
        try {
            const { id } = req.params;
            const userDados = req.body;
            const userAtualizadoDto = await UserService.atualizarParcialmente(id, userDados);
            res.status(200).json(userAtualizadoDto);
        } catch (error) {
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            const { id } = req.params;
            await UserService.deletar(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;