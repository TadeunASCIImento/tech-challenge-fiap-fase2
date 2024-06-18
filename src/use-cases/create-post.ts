import { IPost } from "../entities/interfaces/post.interface";
import { IPostRepository } from "../repositories/post.repository.interface";

export class CreatePostUseCase {
    
    constructor(private repository: IPostRepository){}

    handler(post: IPost) {
        return this.repository.save(post);
    }
}