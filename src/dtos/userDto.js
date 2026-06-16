class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.nome = user.nome;
        this.email = user.email;
        this.papeis = user.papeis;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}

export default UserDTO;
