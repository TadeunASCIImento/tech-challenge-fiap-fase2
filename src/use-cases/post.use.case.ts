import { IPost } from "../entities/interfaces/post.interface";
import { IPostRepository } from "../repositories/post.repository.interface";

export class PostUseCaseHandlers {
    
    constructor(private repository: IPostRepository){}

    async createHandler(post: IPost) {
        return this.repository.save(post);
    }

    async deleteHandler(id: number){
        return this.repository.delete(id);
    }

    async findHandler(id: number){
        return this.repository.findById(id);
    }

    async findAllHandler(page: number, limit: number){
        return this.repository.findAll(page, limit);
    }

    async searchHandler(keywordToSearch: string){
        return this.repository.search(keywordToSearch);
    }

    async updateHandler(post: IPost){
        return this.repository.update(post);
    }
}