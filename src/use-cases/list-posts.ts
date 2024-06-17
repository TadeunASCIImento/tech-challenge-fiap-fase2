import { PostRepository } from "../repositories/post.repository";

export class FindAllPostUseCase {

    constructor(private repository: PostRepository){}

    handler(page: number, limit: number){
        return this.repository.findAll(page, limit);
    }
}