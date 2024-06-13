import { PostRepository } from "../repositories/post.repository";

export class UpdatePostUseCase {

    constructor(private repository: PostRepository){}

    handler(id: number){
        return this.repository.update(id);
    }
}