import { Repository } from "typeorm";
import { IUser } from "../../entities/interfaces/user.interface";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../../entities/user.entity";
import { appDataSource } from "../../lib/orm/typeorm";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor(){
        this.repository = appDataSource.getRepository(User);
    }

    async save(user: IUser): Promise<IUser | undefined> {
        return await this.repository.save(user);
    }

}