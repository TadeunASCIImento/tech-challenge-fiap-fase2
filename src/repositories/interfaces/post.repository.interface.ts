import { IPost } from "../entities/interfaces/post.interface";
import { PaginatedResult } from "../entities/interfaces/pagination.interface";


export interface IPostRepository {
    
    save(post: IPost): Promise<IPost | undefined>;
    
    findById(id: string): Promise<IPost | undefined | null>;
    
    findAll(page: number, limit: number): Promise<PaginatedResult<IPost> | undefined>;
    
    delete(id: string): void;
    
    search(keywordToSearch: string): Promise<IPost[] | undefined>
    
    update(post: IPost): void;

}