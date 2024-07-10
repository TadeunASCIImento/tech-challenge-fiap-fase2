import { IUserProfileRepository } from "../repositories/interfaces/user.profile.repository.interface";

export class UserProfileUseCaseHandler {

    constructor(private repository: IUserProfileRepository){}

    async handlerFindProfile(username: string) {
        return this.repository.findProfileByUserName(username);
    }

}