import { Request, Response } from "express";
import { z } from "zod";

import { makeCreatePostUseCase } from "../../../use-cases/factory/make-create-post-use-case";

export async function createPost(request: Request, response: Response) {
    try {
        const registerBodySchema = z.object({
            title: z.string(),
            description: z.string()
        });

        const { title, description } = registerBodySchema.parse(request.body);
        
        await makeCreatePostUseCase().handler({ title, description });
        response.status(201).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}