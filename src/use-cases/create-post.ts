import { Post } from "../entities/post.entity";
import { IPostRepository } from "../repositories/post.repository.interface";

export class CreatePostUseCase {
    
    constructor(private repository: IPostRepository){}

    handler(post: Post) {
        return this.repository.save(post);
    }
}