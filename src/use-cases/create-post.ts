import { Post } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

export class CreatePostUseCase {
    
    constructor(private repository: PostRepository){}

    handler(post: Post) {
        return this.repository.save(post);
    }
}