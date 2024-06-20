import { IUser } from "../entities/interfaces/user.interface";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";

export class UserUseCaseHandler {

    constructor(private repository: IUserRepository){}

    async createHandler(user: IUser): Promise<IUser | undefined> {
        return this.repository.save(user)

    }

    async findHandler(id: string): Promise<IUser | undefined| null> {
        return await this.repository.find(id);
    }
}