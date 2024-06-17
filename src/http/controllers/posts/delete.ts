import { Request, Response } from "express";
import { z } from "zod";
import { PostRepository } from "../../../repositories/post.repository";
import { DeletePostUseCase } from "../../../use-cases/delete-post";

export async function deletePostById(request: Request, response: Response) {
    try {
        const deleteParamSchema = z.object({ id: z.coerce.number() });

        const { id } = deleteParamSchema.parse(request.params);
    
        const repository = new PostRepository();
        const deletePostUseCase = new DeletePostUseCase(repository);
        
        await deletePostUseCase.handler(id);
        response.status(200).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}