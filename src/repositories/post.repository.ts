import { IPost } from "../entities/interfaces/post.interface";
import { database } from "../lib/pg/db";
import { IPostRepository } from "./post.repository.interface";

interface PaginatedResult<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalRecords: number;
}

export class PostRepository implements IPostRepository{
    
    async save({ title, description }: IPost): Promise<IPost | undefined> {
        const result = await database.clientInstance?.query<IPost>(
            `INSERT INTO posts (title, description) VALUES ($1, $2) RETURNING *`,
            [ title, description]
        );
        return result?.rows[0];
    }
    
    async findById(id: number): Promise<IPost | undefined> {
        const result = await database.clientInstance?.query<IPost>(
            `SELECT * FROM posts WHERE id = $1`,
            [ id ]
        );
        return result?.rows[0];
    }

    async findAll(page: number, limit: number): Promise<PaginatedResult<IPost> | undefined> {
        if (limit <= 0  || page <= 0) {
            throw new Error("Limit must be greater than 0 and page must be greater than 0");
        }        
        const offset = (page - 1) * limit;
        try {
            const result = await database.clientInstance?.query<IPost>(
                `SELECT * FROM posts LIMIT $1 OFFSET $2`,
                [ limit, offset ]
            );   
            const countResult = await database.clientInstance?.query<{ count: number }>(
                `SELECT COUNT(*) as count FROM posts`
            );
            const totalRecords = countResult?.rows[0]?.count ?? 0;
            const totalPages = Math.ceil(totalRecords / limit);
            
            return {
                data: result?.rows ?? [],
                currentPage: page,
                totalPages,
                totalRecords
            };
    
        } catch (error) {
            console.error('Error executing findAll', error);
        }
    }

    async delete(id: number) {
        await database.clientInstance?.query<IPost>(
            `DELETE FROM posts WHERE id = $1`,
            [ id ]
        );       
    }

    async search(keywordToSearch: string): Promise<IPost[] | undefined> {
        const formattedKeyword = `%${keywordToSearch}%`;
        const result = await database.clientInstance?.query<IPost>(
            `SELECT * FROM posts WHERE title LIKE $1 OR description LIKE $1`,
            [ formattedKeyword ]
        );
        return result?.rows;
    }

    async update({id, title, description }: IPost){
        await database.clientInstance?.query<IPost>(
            `UPDATE posts SET title = $2, description = $3 WHERE id = $1`,
            [ id ,title, description ] 
        );   
    }

}