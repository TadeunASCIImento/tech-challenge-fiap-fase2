import { IUserProfileRepository } from "../repositories/interfaces/user.profile.repository.interface";

export class UserProfileUseCaseHandler {

    constructor(private repository: IUserProfileRepository){}

    async handlerFindProfile(id: number) {
        return this.repository.findProfileById(id);
    }

}