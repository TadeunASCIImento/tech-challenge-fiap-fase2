import { PostRepository } from "../repositories/post.repository";

export class SearchPostUseCase {

    constructor(private repository: PostRepository){}

    handler(keywordToSearch: string){
        return this.repository.search(keywordToSearch);
    }
}