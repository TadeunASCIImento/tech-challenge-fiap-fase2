import request from 'supertest';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { app } from '../../app';
import { hasPermission } from "../../utils/user.authorization.util";
import { makeUserUseCase } from '../../use-cases/factories/user.use.case.factory';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../utils/user.authorization.util');
jest.mock('../../use-cases/factories/user.use.case.factory');

jest.mock('../../lib/orm/typeorm.config', () => ({
    getConnection: jest.fn().mockReturnValue({
      getRepository: jest.fn().mockReturnValue({
        save: jest.fn().mockResolvedValue({ id: 1, username: 'tnascimento', profileId: 1 }),
      }),
      close: jest.fn(),
    }),
  }));
  

describe('POST /api/user', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user and return 201 status', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        const mockCreateHandler = jest.fn().mockResolvedValue({
            id: 1,
            username: 'tnascimento',
            profileId: 1
        });
        (makeUserUseCase as jest.Mock)
        .mockReturnValue({ createHandler: mockCreateHandler });

        const response = await request(app)
            .post('/api/user')
            .send({ username: 'tnascimento', password: 'password', profileId: 1 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 1,
            username: 'tnascimento',
            profileId: 1
        });

        expect(bcrypt.hash).toHaveBeenCalledWith('password', 8);        
        expect(mockCreateHandler).toHaveBeenCalledWith({
            username: 'tnascimento',
            password: 'hashedPassword',
            profileId: 1
        });
    });

    it('should return 400 if request body is invalid', async () => {
        const response = await request(app)
            .post('/api/user')
            .send({ username: 'tnascimento' });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should return 500 if there is a server error', async () => {
        (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hash error'));
        const response = await request(app)
            .post('/api/user')
            .send({ username: 'tnascimento', password: 'password', profileId: 1 });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('POST api/user/authorization', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    const url = '/api/user/authorization'

    it('should return status 200 and a token if credentials are valid and user has permission', async () => {
        const findHandlerMock = jest.fn().mockResolvedValue({ 
            username: 'tnascimento'
        });
        (makeUserUseCase as jest.Mock).mockReturnValue({ findHandler: findHandlerMock });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

        const hasPermissionMock = jest.fn().mockResolvedValue(true);
        (hasPermission as jest.Mock).mockReturnValue(hasPermissionMock);

        const tokenMock = 'fakeToken';
        (jwt.sign as jest.Mock).mockReturnValue(tokenMock);

        const response = await request(app)
        .post(url)
        .send({ username: 'tnascimento', password: 'password' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            username: 'tnascimento',
            token: tokenMock
        });
    });

    it('should return 400 if request body is invalid', async () => {
        const body = {};

        const response  = await request(app)
        .post(url)
        .send(body);

        expect(response.status).toBe(400);
    });

    it('should return 401 if user is not found or password does not match', async () => {
        const findHandlerMock = jest.fn().mockResolvedValue(null);
        (makeUserUseCase as jest.Mock).mockReturnValue({ findHandler: findHandlerMock });

        const response = await request(app)
        .post(url)
        .send({ username: 'tnascimento', password: 'password' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid credentials' });
    });

    it('should return 403 if user does not have permission', async () => {
        const findHandlerMock = jest.fn().mockResolvedValue({ 
            username: 'tnascimento'
        });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);        
        (makeUserUseCase as jest.Mock).mockReturnValue({ findHandler: findHandlerMock });
        (hasPermission as jest.Mock).mockReturnValue(false);

        const response = await request(app)
        .post(url)
        .send({ username: 'tnascimento', password: 'password' });

        expect(response.status).toBe(403);
        expect(response.body).toEqual({ message: 'User no has permission' });
    });

    it('should return 500 if there is a server error', async () => {
        const findHandlerMock = jest.fn().mockRejectedValue(new Error('Server error'));

        (makeUserUseCase as jest.Mock).mockReturnValue({ findHandler: findHandlerMock });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
        (hasPermission as jest.Mock).mockReturnValue(true);

        const response = await request(app)
        .post(url)
        .send({ username: 'tnascimento', password: 'password' });
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });

    
});




