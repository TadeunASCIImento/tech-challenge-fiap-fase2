import { Request, Response } from "express";
import { z } from "zod";

import { makeSearchPostUseCase } from "../../../use-cases/factory/make-search-post-use-case";

export async function searchPostByKeyword(request: Request, response: Response) {
    try {
        const querySchema = z.object({ keyword: z.string() });
        const { keyword } = querySchema.parse(request.query);
        const post = await makeSearchPostUseCase().handler(keyword);
        response.status(200).json(post);
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}
