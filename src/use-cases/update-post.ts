import { IPost } from "../entities/interfaces/post.interface";
import { IPostRepository } from "../repositories/post.repository.interface";


export class UpdatePostUseCase {

    constructor(private repository: IPostRepository){}

    handler(post: IPost){
        return this.repository.update(post);
    }
}