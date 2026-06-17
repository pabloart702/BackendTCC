class WebController {
    static login(req, res) {
        res.render('login', { title: 'Login' });
    }

    static async listarArCondicionados(req, res, next) {
        try {
            res.render('arCondicionados', { title: 'Ar-Condicionados' });
        } catch (error) {
            next(error);
        }
    }

    static async listarSalas(req, res, next) {
        try {
            res.render('salas', { title: 'Salas' });
        } catch (error) {
            next(error);
        }
    }

    static async listarUsers(req, res, next) {
        try {
            res.render('users', { title: 'Usuários' });
        } catch (error) {
            next(error);
        }
    }
}

export default WebController;
