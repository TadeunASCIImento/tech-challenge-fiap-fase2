import { Request, Response } from "express";
import { z } from "zod";
import { makeFindPostUseCase } from "../../../use-cases/factory/make-find-post-use-case";

export async function findPostById(request: Request, response: Response) {

        const findParamSchema = z.object({ 
            id: z.coerce.number() 
        });

        const { id } = findParamSchema.parse(request.params);
        
        const post = await makeFindPostUseCase().handler(id);
        
        response.status(200).json(post);
}