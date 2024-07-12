import { NextFunction, Request, Response } from "express";
import { hasPermission } from "../../utils/user.authorization.util";

import { z } from 'zod';

export async function validateUserPermission(request: Request, response: Response, next: NextFunction) {
    try {
        const bodySchema = z.object({
            username: z.string(),
            password: z.string()
        });
        
    const user = bodySchema.parse(request.body); 

    const userHasPermission = await hasPermission(user);
        
    if (!userHasPermission) {
        return response.status(403).send({ message: 'User no has permission'})
    }
    next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }


}