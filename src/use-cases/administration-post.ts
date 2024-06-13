import { PostRepository } from "../repositories/post.repository";

export class AdministrationPostsUseCase {

    constructor(private repository: PostRepository){}

    handler(){
        this.repository.findAll();
    }
}