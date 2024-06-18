import { IPostRepository } from "../repositories/post.repository.interface";

export class FindAllPostUseCase {

    constructor(private repository: IPostRepository){}

    handler(page: number, limit: number){
        return this.repository.findAll(page, limit);
    }
}