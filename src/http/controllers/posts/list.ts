import { Request, Response } from "express";
import { z } from "zod";

import { makeFindAllPostUseCase } from "../../../use-cases/factory/make-list-posts-use-case";

export async function findAllPosts(request: Request, response: Response) {
    try {
        const paramsSchema = z.object({
            page: z.coerce.number(),
            limit: z.coerce.number()
        });
        const {page, limit } = paramsSchema.parse(request.query);
        const allPosts = await makeFindAllPostUseCase().handler(page, limit);
        response.status(200).json(allPosts);
    } catch (error) {
        response.status(500).json({error: "Internal Server error"});
    }
}