import { IUserProfile } from "../../entities/interfaces/user.profile.interface";

export interface IUserProfileRepository {

    findProfileByUserName(username: string): Promise<IUserProfile | undefined | null>;

}