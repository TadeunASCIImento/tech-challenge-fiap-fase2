import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../../middlewares/jwt/jwt.middleware';

jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.get('/api/posts/admin', verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ message: 'Protected route' });
});

describe('verifyToken middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if no token is provided', async () => {
        const token = '';
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('No token provided'), null);
        });

        const response = await request(app)
            .get('/api/posts/admin')
            .set('Authorization', token);
            
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'No token provided' });
    });

    it('should return 401 if token is invalid', async () => {
        const token = 'invalidtoken';
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        const response = await request(app)
            .get('/api/posts/admin')
            .set('Authorization', token);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Failed to authenticate token' });
    });

    it('should call next if token is valid', async () => {
        const token = 'validtoken';
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, {});
        });

        const response = await request(app)
            .get('/api/posts/admin')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Protected route' });
    });

    it('should return 400 if headers validation fails', async () => {
        const response = await request(app)
            .get('/api/posts/admin');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

    it('should return 500 for other errors', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Some error');
        });

        const token = 'validtoken';

        const response = await request(app)
            .get('/api/posts/admin')
            .set('Authorization', token);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});
