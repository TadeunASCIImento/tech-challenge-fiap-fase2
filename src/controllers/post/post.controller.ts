import { z } from "zod";
import { Request, Response } from "express";
import { makePostUseCase } from "../../use-cases/factories/post.use.case.factory";


export async function createPost(request: Request, response: Response) {
    try {
        const registerBodySchema = z.object({
            title: z.string(),
            description: z.string()
        });

        const { title, description } = registerBodySchema.parse(request.body);
        
        await makePostUseCase().handlerCreate({ title, description });
        response.status(201).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}

export async function deletePostById(request: Request, response: Response) {
    try {
        const deleteParamSchema = z.object({ 
            id: z.string() 
        });
        
        const { id } = deleteParamSchema.parse(request.params);
        
        await makePostUseCase().handlerDelete(id);
        response.status(200).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}

export async function findPostById(request: Request, response: Response) {
    try {
        const findParamSchema = z.object({ 
            id: z.string() 
        });

        const { id } = findParamSchema.parse(request.params);

        const post = await makePostUseCase().handlerFind(id);
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

export async function findAllPosts(request: Request, response: Response) {
    try {
        const paramsSchema = z.object({
            page: z.coerce.number(),
            limit: z.coerce.number()
        });
        
        const { page, limit } = paramsSchema.parse(request.query);

        const allPosts = await makePostUseCase().handlerFindAll(page, limit);
        response.status(200).json(allPosts);
    } catch (error) {
        response.status(500).json({error: "Internal Server error"});
    }
}

export async function searchPostByKeyword(request: Request, response: Response) {
    try {
        const querySchema = z.object({ 
            keyword: z.string() 
        });
        
        const { keyword } = querySchema.parse(request.query);
        
        const post = await makePostUseCase().handlerSearch(keyword);
        response.status(200).json(post);
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}

export async function updatePostById(request: Request, response: Response) {
    try {
        const paramsSchema = z.object({ 
            id: z.string() 
        });
        
        const bodySchema = z.object({ 
            title: z.string(),
            description: z.string() 
        });
        
        const { id } = paramsSchema.parse(request.params);
        const { title, description } = bodySchema.parse(request.body);
        
        makePostUseCase().handlerUpdate({id, title, description});
        response.status(200).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
}
