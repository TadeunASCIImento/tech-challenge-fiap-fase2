import { Post } from "../entities/post.entity";

interface PaginatedResult<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalRecords: number;
}

export interface IPostRepository {
    
    save(post: Post): Promise<Post | undefined>;
    findById(id: number): Promise<Post | undefined>;
    findAll(page: number, limit: number): Promise<PaginatedResult<Post> | undefined>;
    delete(id: number): void;
    search(keywordToSearch: string): Promise<Post[] | undefined>
    update(post: Post): void;

}