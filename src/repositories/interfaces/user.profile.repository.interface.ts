import { IUserProfile } from "../../entities/interfaces/user.profile.interface";

export interface IUserProfileRepository {

    findProfileById(id: number): Promise<IUserProfile | undefined | null>;

}