import { FindOneOptions, Repository } from "typeorm";
import { IUserProfile } from "../../entities/interfaces/user.profile.interface";
import { IUserProfileRepository } from "../interfaces/user.profile.repository.interface";
import { UserProfile } from "../../entities/user.profile.entitie";
import { appDataSource } from "../../lib/orm/typeorm.config";

export class UserProfileRepository implements IUserProfileRepository {
    private repository: Repository<UserProfile>;
    
    constructor(){
        this.repository = appDataSource.getRepository(UserProfile);
    }
    
    async findProfileById(id: number): Promise<IUserProfile | undefined | null>{
        const options: FindOneOptions<IUserProfile> = {
            where: {id: id}
        }
        return await this.repository.findOne(options)
    }

}