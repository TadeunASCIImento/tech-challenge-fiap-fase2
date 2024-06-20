import { Request, Response } from "express";
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { makeUserUseCaseHandler } from "../../use-cases/factories/user.use.case.factory";

import { env } from "../../env";

export async function createUser(request: Request, response: Response) {
    try {
        const bodySchema = z.object({
            username: z.string(),
            password: z.string()
        });

        const { username, password } = bodySchema.parse(request.body);
        
        const hashedPassword = await bcrypt.hash(password, 8);
        
        const userHashedPassword = {username, password: hashedPassword };

        const user = await makeUserUseCaseHandler().createHandler(userHashedPassword);
        response.status(201).send({ id: user?.id, username: user?.username });
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
    
}


export async function generateToken(request: Request, response: Response) {
    try {
        const bodySchema = z.object({
            id: z.string(),
            username: z.string(),
            password: z.string()
        });
    
        const { id, username, password } = bodySchema.parse(request.body);

        const user = await makeUserUseCaseHandler().findHandler(id);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return response.status(401).send({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ username }, env.JWT_SECRET, { expiresIn: '1h' });

        response.status(201).send({ username, token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }
    
}