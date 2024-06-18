import { IPostRepository } from "../repositories/post.repository.interface";

export class FindPostUseCase {

    constructor(private repository: IPostRepository){}

    handler(id: number){
        return this.repository.findById(id);
    }
}