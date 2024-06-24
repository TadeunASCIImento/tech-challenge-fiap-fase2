import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { z } from 'zod';
import { env } from "../../env";

const headerSchema = z.object({
    authorization: z.string()
})

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
    try {
        const headers = { authorization: request.headers.authorization };

        const _headers = headerSchema.parse(headers);
        
        const token = _headers.authorization;

        if (!token) {
            return response.status(401).send({
                message: 'No token provided'
            })
        }

        jwt.verify(token, env.JWT_SECRET, (error, _) => {
            if (error) {
                return response.status(401).send({
                    message: 'Failed to authenticate token'
                })
            }
        })
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            response.status(400).json({ errors: error.errors });
        } else {
            response.status(500).json({ error: "Internal server error" });
        }
    }

}