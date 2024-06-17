import { Request, Response } from "express";
import { z } from "zod";
import { PostRepository } from "../../../repositories/post.repository";
import { SearchPostUseCase } from "../../../use-cases/search-post";

export async function searchPostByKeyword(request: Request, response: Response) {
    try {
        const querySchema = z.object({ keyword: z.string() });
        const { keyword } = querySchema.parse(request.query);

        const repository = new PostRepository();
        const searchPostUseCase = new SearchPostUseCase(repository);

        const post = await searchPostUseCase.handler(keyword);
        response.status(200).json(post);
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}
