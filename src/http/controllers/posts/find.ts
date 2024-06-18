import { Request, Response } from "express";
import { z } from "zod";
import { makeFindPostUseCase } from "../../../use-cases/factory/make-find-post-use-case";

export async function findPostById(request: Request, response: Response) {
    try {
        const findParamSchema = z.object({ 
            id: z.coerce.number() 
        });
        const { id } = findParamSchema.parse(request.params);
        const post = await makeFindPostUseCase().handler(id);
        
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