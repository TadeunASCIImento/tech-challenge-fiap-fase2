import { IUser } from "../entities/interfaces/user.interface";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";

export class UserUseCaseHandler {

    constructor(private repository: IUserRepository){}

    async createHandler(user: IUser) {
        return this.repository.save(user)

    }
}