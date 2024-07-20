import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
    app
} from '../../app';
import {
    makePostUseCase
} from '../../use-cases/factories/post.use.case.factory';
import {
    makeUserUseCase
} from '../../use-cases/factories/user.use.case.factory';
import {
    hasPermission
} from '../../utils/user.authorization.util';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../utils/user.authorization.util');
jest.mock('../../use-cases/factories/post.use.case.factory');
jest.mock('../../use-cases/factories/user.use.case.factory');

jest.mock('../../lib/orm/typeorm.config', () => ({
    appDataSource: {
        getRepository: jest.fn(),
        initialize: jest.fn(),
        destroy: jest.fn()
    }
}));

describe('Post Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('should create a post and return 201', async () => {
            const findHandlerMock = jest.fn().mockResolvedValue({
                username: 'tnascimento'
            });
            (makeUserUseCase as jest.Mock).mockReturnValue({
                findHandler: findHandlerMock
            });
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

            const hasPermissionMock = jest.fn().mockResolvedValue(true);
            (hasPermission as jest.Mock).mockReturnValue(hasPermissionMock);

            const mockHandlerCreate = jest.fn().mockResolvedValue(undefined);
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerCreate: mockHandlerCreate
            });

            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, {
                    id: '1',
                    username: 'tnascimento'
                });
            });

            const token = jwt.sign({
                id: '1',
                username: 'tnascimento'
            }, 'secret', {
                expiresIn: '1h'
            });

            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Post',
                    description: 'Test Description'
                });

            expect(response.status).toBe(201);
        });

        it('should return 400 for invalid input', async () => {
            const response = await request(app)
                .post('/api/posts')
                .send({
                    title: 123,
                    description: 'Test Description'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('deletePostById', () => {
        it('should delete a post and return 200', async () => {
            const findHandlerMock = jest.fn().mockResolvedValue({
                username: 'tnascimento'
            });
            (makeUserUseCase as jest.Mock).mockReturnValue({
                findHandler: findHandlerMock
            });
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

            const hasPermissionMock = jest.fn().mockResolvedValue(true);
            (hasPermission as jest.Mock).mockReturnValue(hasPermissionMock);

            const mockHandlerDelete = jest.fn().mockResolvedValue(true);
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerDelete: mockHandlerDelete
            });

            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, {
                    id: '1',
                    username: 'tnascimento'
                });
            });

            const token = jwt.sign({
                id: '1',
                username: 'tnascimento'
            }, 'secret', {
                expiresIn: '1h'
            });

            const response = await request(app)
                .delete('/api/posts/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });

        it('should return 400 for invalid id', async () => {
            const response = await request(app).delete('/api/posts/.....');

            expect(response.status).toBe(400);
        });
    });


    describe('findPostById', () => {
        it('should find a post and return 200', async () => {
            const post = {
                id: '1',
                title: 'Test Post',
                description: 'Test Description'
            };

            const mockHandlerFind = jest.fn().mockResolvedValue(post);
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerFind: mockHandlerFind
            });

            const response = await request(app).get('/api/posts/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(post);
        });

        it('should return 203 if post not found', async () => {
            const mockHandlerFind = jest.fn().mockResolvedValue(undefined);
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerFind: mockHandlerFind
            });

            const response = await request(app).get('/api/posts/1');

            expect(response.status).toBe(203);
            expect(response.body).toBe('Post not found');
        });
    });


    describe('findAllPosts', () => {
        it('should return all posts with pagination and return 200', async () => {
            const posts = [{
                id: '1',
                title: 'Test Post',
                description: 'Test Description'
            }];
            const mockHandlerFindAll = jest.fn().mockResolvedValue({
                data: posts,
                currentPage: 1,
                totalPages: 1,
                totalRecords: 1
            });

            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerFindAll: mockHandlerFindAll
            });

            const response = await request(app).get('/api/posts').query({
                page: 1,
                limit: 10
            });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: posts,
                currentPage: 1,
                totalPages: 1,
                totalRecords: 1,
            });
        });

        it('should return 500 for server error', async () => {
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerFindAll: jest.fn().mockRejectedValue(new Error('Internal Server error'))
            });

            const response = await request(app).get('/api/posts').query({
                page: 1,
                limit: 10
            });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: 'Internal Server error'
            });
        });
    });

    describe('searchPostByKeyword', () => {
        it('should return posts matching keyword and return 200', async () => {
            const posts = [{
                id: '1',
                title: 'Test Post',
                description: 'Test Description'
            }];
            const mockHandlerSearch = jest.fn().mockResolvedValue(posts);

            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerSearch: mockHandlerSearch
            });

            const response = await request(app).get('/api/posts/search').query({
                keyword: 'Test'
            });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(posts);
        });

        it('should return 400 for invalid keyword', async () => {
            const response = await request(app).get('/api/posts/search').query({
                invalidKeyword: ''
            });

            expect(response.status).toBe(400);
        });
    });

    describe('updatePostById', () => {
        it('should update a post and return 200', async () => {
            const findHandlerMock = jest.fn().mockResolvedValue({
                username: 'tnascimento'
            });
            (makeUserUseCase as jest.Mock).mockReturnValue({
                findHandler: findHandlerMock
            });
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

            const hasPermissionMock = jest.fn().mockResolvedValue(true);
            (hasPermission as jest.Mock).mockReturnValue(hasPermissionMock);

            const mockHandlerDelete = jest.fn().mockResolvedValue(true);
            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerDelete: mockHandlerDelete
            });

            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, {
                    id: '1',
                    username: 'tnascimento'
                });
            });

            const token = jwt.sign({
                id: '1',
                username: 'tnascimento'
            }, 'secret', {
                expiresIn: '1h'
            });


            const mockHandlerUpdate = jest.fn().mockResolvedValue({
                id: '1',
                title: 'Test Post',
                description: 'Test Description'
            });

            (makePostUseCase as jest.Mock).mockReturnValue({
                handlerUpdate: mockHandlerUpdate
            });

            const response = await request(app)
                .put('/api/posts/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Title',
                    description: 'Updated Description'
                });

            expect(response.status).toBe(200);
        });

        it('should return 400 for invalid id or body', async () => {
            const response = await request(app)
                .put('/api/posts/abc')
                .send({
                    title: 'Updated Title',
                    description: 'Updated Description'
                });

            expect(response.status).toBe(400);
        });
    });

});