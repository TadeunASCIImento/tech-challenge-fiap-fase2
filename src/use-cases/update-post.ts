import { Post } from "../entities/post.entity";
import { IPostRepository } from "../repositories/post.repository.interface";


export class UpdatePostUseCase {

    constructor(private repository: IPostRepository){}

    handler(post: Post){
        return this.repository.update(post);
    }
}