import { FindOneOptions, Repository } from "typeorm";
import { appDataSource } from "../../lib/orm/typeorm";
import { ILike } from "typeorm";

import { PaginatedResult } from "../../entities/interfaces/pagination.interface";
import { IPostRepository } from "../interfaces/post.repository.interface";
import { IPost } from "../../entities/interfaces/post.interface";
import { Post } from "../../entities/post.entity";

export class PostRepository implements IPostRepository {
    private repository: Repository<Post>
    
    constructor() {
        this.repository = appDataSource.getRepository(Post)
    }
    
    async save(toSave: IPost): Promise<IPost | undefined> {
        return await this.repository.save(toSave);
    }
    
    async findById(id: string): Promise<IPost | undefined | null> {
        const options: FindOneOptions<IPost> = {
            where: { id: id }
        }
        return await this.repository.findOne(options);
    }
    
    async delete(id: string) {
        await this.repository.delete(id);
    }

    async findAll(page: number, limit: number): Promise<PaginatedResult<IPost> | undefined> {
        const offset = (page - 1) * limit;
        const [data, total] = await this.repository.findAndCount({
            skip: offset,
            take: limit
        });
        
        const totalPages = Math.ceil(total/limit);
        
        return {
            data: data || [],
            currentPage: page,
            totalPages: totalPages,
            totalRecords: total
        };
    }
       
    async search(keywordToSearch: string): Promise<IPost[] | undefined> {
        const options: FindOneOptions<IPost> = {
            where:[
                { title: ILike(`%${keywordToSearch}%`) },
                { description:ILike(`%${keywordToSearch}%`) }
            ]
        }
        return await this.repository.find(options);
    }
    
    async update({id, title, description}: IPost) {
        id ? await this.repository.update(id, { title, description }) : {};
    }
    
}