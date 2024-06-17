import { Post } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

export class UpdatePostUseCase {

    constructor(private repository: PostRepository){}

    handler(post: Post){
        return this.repository.update(post);
    }
}