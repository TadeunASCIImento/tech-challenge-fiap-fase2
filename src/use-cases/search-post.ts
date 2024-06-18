import { IPostRepository } from "../repositories/post.repository.interface";


export class SearchPostUseCase {

    constructor(private repository: IPostRepository){}

    handler(keywordToSearch: string){
        return this.repository.search(keywordToSearch);
    }
}