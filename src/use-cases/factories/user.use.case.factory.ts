import { UserRepository } from "../../repositories/typeorm/user.repository";
import { UserUseCaseHandler } from "../user.use.case";

export function makeUserUseCaseHandler(){
    const repository = new UserRepository();
    const userUseCaseHandler = new UserUseCaseHandler(repository);

    return userUseCaseHandler;
}