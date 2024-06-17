import { Request, Response } from "express";
import { PostRepository } from "../../../repositories/post.repository";
import { FindAllPostUseCase } from "../../../use-cases/list-posts";
import { z } from "zod";

export async function findAllPosts(request: Request, response: Response) {
    try {
        const paramsSchema = z.object({
            page: z.coerce.number(),
            limit: z.coerce.number()
        });
        const {page, limit } = paramsSchema.parse(request.query);
        
        const repository = new PostRepository();
        const findAllPostUseCase = new FindAllPostUseCase(repository);

        const allPosts = await findAllPostUseCase.handler(page, limit);
        response.status(200).json(allPosts);
    } catch (error) {
        response.status(500).json({error: "Internal Server error"});
    }
}