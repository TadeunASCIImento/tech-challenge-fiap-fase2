import { Request, Response } from "express";
import { number, z } from "zod";
import { PostRepository } from "../../../repositories/post.repository";
import { FindPostByIdUseCase } from "../../../use-cases/find-post";

export async function findPostById(request: Request, response: Response) {
    try {
        const findParamSchema = z.object({ id: z.coerce.number() });
        
        const { id } = findParamSchema.parse(request.params);
        
        const repository = new PostRepository();
        const findPostByIdUseCase = new FindPostByIdUseCase(repository);

        const post  = await findPostByIdUseCase.handler(id);
        !post ? response.status(203).json('Post not found') : {};
        response.status(200).json(post);
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}