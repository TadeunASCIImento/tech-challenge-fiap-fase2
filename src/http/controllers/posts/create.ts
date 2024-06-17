import { Request, Response } from "express";
import { z } from "zod";

import { Post } from "../../../entities/post.entity";
import { PostRepository } from "../../../repositories/post.repository";
import { CreatePostUseCase } from "../../../use-cases/create-post";

export async function createPost(request: Request, response: Response) {
    try {
        const registerBodySchema = z.object({
            title: z.string(),
            description: z.string()
        });

        const {title, description } = registerBodySchema.parse(request.body);
        
        const postRepository = new PostRepository();
        const createPostUseCase = new CreatePostUseCase(postRepository);
        
        const toSave = new Post(title, description);
        
        await createPostUseCase.handler(toSave);
        response.status(201).send();

    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}