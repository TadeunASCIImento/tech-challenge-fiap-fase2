import { PostRepository } from "../repositories/post.repository";

export class DeletePostUseCase {

    constructor(private repository: PostRepository){}

    handler(id: number){
        return this.repository.delete(id);
    }
}