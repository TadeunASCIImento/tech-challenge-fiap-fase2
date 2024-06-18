import { Request, Response } from "express";
import { z } from "zod";

import { makeDeletePostUseCase } from "../../../use-cases/factory/make-delete-post-use-case";

export async function deletePostById(request: Request, response: Response) {
    try {
        const deleteParamSchema = z.object({ id: z.coerce.number() });
        const { id } = deleteParamSchema.parse(request.params);
        await makeDeletePostUseCase().handler(id);
        response.status(200).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}