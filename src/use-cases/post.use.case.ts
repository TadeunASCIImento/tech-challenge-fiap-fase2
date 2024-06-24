import { IPost } from "../entities/interfaces/post.interface";
import { IPostRepository } from "../repositories/interfaces/post.repository.interface";

export class PostUseCaseHandlers {
    
    constructor(private repository: IPostRepository){}

    async handlerCreate(post: IPost) {
        return this.repository.save(post);
    }

    async handlerDelete(id: string){
        return this.repository.delete(id);
    }

    async handlerFind(id: string){
        return this.repository.findById(id);
    }

    async handlerFindAll(page: number, limit: number){
        return this.repository.findAll(page, limit);
    }

    async handlerSearch(keywordToSearch: string){
        return this.repository.search(keywordToSearch);
    }

    async handlerUpdate(post: IPost){
        return this.repository.update(post);
    }
}