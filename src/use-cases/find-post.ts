import { PostRepository } from "../repositories/post.repository";

export class FindPostByIdUseCase {

    constructor(private repository: PostRepository){}

    handler(id: number){
        return this.repository.findById(id);
    }
}