import { PostRepository } from "../repositories/post.repository";

export class FindAllPostUseCase {

    constructor(private repository: PostRepository){}

    handler(){
        return this.repository.findAll();
    }
}