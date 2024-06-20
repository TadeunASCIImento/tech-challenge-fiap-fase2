import { IUser } from "../../entities/interfaces/user.interface";

export interface IUserRepository {

    save(user: IUser): Promise<IUser | undefined>;

    find(id: string): Promise<IUser | undefined | null>;

}