import ArCondicionadoService from '../services/arCondicionadoService.js';
import SalaService from '../services/salaService.js';
import UserService from '../services/userService.js';

class WebController {
    static async listarArCondicionados(req, res, next) {
        try {
            const arCondicionados = await ArCondicionadoService.listar();
            res.render('arCondicionados', { title: 'Ar-Condicionados', arCondicionados: arCondicionados });
        } catch (error) {
            next(error);
        }
    }

    static async listarSalas(req, res, next) {
        try {
            const salas = await SalaService.listar();
            res.render('salas', { title: 'Salas', salas: salas });
        } catch (error) {
            next(error);
        }
    }

    static async listarUsers(req, res, next) {
        try {
            const users = await UserService.listar();
            res.render('users', { title: 'Usuários', users: users });
        } catch (error) {
            next(error);
        }
    }
}

export default WebController;
