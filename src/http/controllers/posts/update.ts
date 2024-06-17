import { Request, Response } from "express";
import { z } from "zod";
import { PostRepository } from "../../../repositories/post.repository";
import { UpdatePostUseCase } from "../../../use-cases/update-post";

export async function updatePostById(request: Request, response: Response) {
    try {
        const paramsSchema = z.object({ 
            id: z.coerce.number() 
        });
        const bodySchema = z.object({ 
            title: z.string(),
            description: z.string()
        });

        const { id } = paramsSchema.parse(request.params);
        const { title, description } = bodySchema.parse(request.body);

        const repository = new PostRepository();
        const updatePostUseCase = new UpdatePostUseCase(repository);

        updatePostUseCase.handler({id, title, description});
        response.status(200).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}