class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.nome = user.nome;
        this.email = user.email;
        this.papeis = user.papeis;
    }
}

export default UserDTO;
