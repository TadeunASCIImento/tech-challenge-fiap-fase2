import { Request, Response } from "express";
import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { makeUserUseCaseHandler } from "../../use-cases/factories/user.use.case.factory";


export async function createUser(request: Request, response: Response) {
    try {
        const bodySchema = z.object({
            username: z.string(),
            password: z.string()
        });
    
        const { username, password } = bodySchema.parse(request.body);

        const hashedPassword = await bcrypt.hash(password, 8);
        
        const userHashedPassword = {username, password: hashedPassword };

        makeUserUseCaseHandler().createHandler(userHashedPassword);
        response.status(201).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
    
}