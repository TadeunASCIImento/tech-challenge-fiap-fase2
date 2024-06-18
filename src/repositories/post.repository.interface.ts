import { IPost } from "../entities/interfaces/post.interface";
import { PaginatedResult } from "../entities/interfaces/pagination.interface";


export interface IPostRepository {
    
    save(post: IPost): Promise<IPost | undefined>;
    
    findById(id: number): Promise<IPost | undefined>;
    
    findAll(page: number, limit: number): Promise<PaginatedResult<IPost> | undefined>;
    
    delete(id: number): void;
    
    search(keywordToSearch: string): Promise<IPost[] | undefined>
    
    update(post: IPost): void;

}