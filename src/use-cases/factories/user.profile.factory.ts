import { UserProfileRepository } from "../../repositories/typeorm/user.profile.repository";
import { UserProfileUseCaseHandler } from "../user.profile.case";

export function makeUserProfile() {
    const repository = new UserProfileRepository();
    const handler = new UserProfileUseCaseHandler(repository);
    
    return handler;

}