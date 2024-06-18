import { IPostRepository } from "../repositories/post.repository.interface";

export class DeletePostUseCase {

    constructor(private repository: IPostRepository){}

    handler(id: number){
        return this.repository.delete(id);
    }
}