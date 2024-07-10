import { FindOneOptions, Repository } from "typeorm";
import { IUserProfile } from "../../entities/interfaces/user.profile.interface";
import { IUserProfileRepository } from "../interfaces/user.profile.repository.interface";
import { UserProfile } from "../../entities/user.profile.entitie";
import { appDataSource } from "../../lib/orm/typeorm.config";
import { User } from "../../entities/user.entity";
import { IUser } from "../../entities/interfaces/user.interface";

export class UserProfileRepository implements IUserProfileRepository {
    private profileRepository: Repository<UserProfile>;
    private userRepository: Repository<User>;
    
    constructor(){
        this.profileRepository = appDataSource.getRepository(UserProfile);
        this.userRepository = appDataSource.getRepository(User);
    }
    
    async findProfileByUserName(username: string): Promise<IUserProfile | undefined | null>{
        const userOptions: FindOneOptions<IUser> = {
            where: {
                username: username
            }
        }
        const user = await this.userRepository.findOne(userOptions);
        const profileOptions: FindOneOptions<IUserProfile> = {
            where: {
                id: user?.profileId
            }
        }
        return await this.profileRepository.findOne(profileOptions);
    }

}