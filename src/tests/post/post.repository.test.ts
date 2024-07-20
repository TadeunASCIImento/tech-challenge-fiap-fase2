import { Repository } from "typeorm";
import { PostRepository } from '../../repositories/typeorm/post.repository';
import { Post } from '../../entities/post.entity';
import { appDataSource } from '../../lib/orm/typeorm.config';
import { IPost } from '../../entities/interfaces/post.interface';


jest.mock('../../lib/orm/typeorm.config', () => ({
    appDataSource: {
      getRepository: jest.fn(),
      initialize: jest.fn(),
      destroy: jest.fn()
    }
  }));


describe('PostRepository', () => {
  let postRepository: PostRepository;
  let mockRepository: jest.Mocked<Repository<Post>>;

  beforeAll(() => {
    mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<Repository<Post>>;

    (appDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    postRepository = new PostRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save a post', async () => {
      const post: IPost = { id: '1', title: 'Title', description: 'Description' };
      mockRepository.save.mockResolvedValue(post);

      const result = await postRepository.save(post);

      expect(mockRepository.save).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe('findById', () => {
    it('should find a post by id', async () => {
      const id = '1';
      const post: IPost = { id: '1', title: 'Title', description: 'Description' };
      mockRepository.findOne.mockResolvedValue(post);

      const result = await postRepository.findById(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(post);
    });

    it('should return null if post is not found', async () => {
      const id = '1';
      mockRepository.findOne.mockResolvedValue(null);

      const result = await postRepository.findById(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a post by id', async () => {
      const id = '1';
      await postRepository.delete(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return paginated result of posts', async () => {
      const page = 1;
      const limit = 10;
      const posts: IPost[] = [{ id: '1', title: 'Title', description: 'Description' }];
      const total = 1;
      mockRepository.findAndCount.mockResolvedValue([posts, total]);

      const result = await postRepository.findAll(page, limit);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: (page - 1) * limit,
        take: limit,
      });
      expect(result).toEqual({
        data: posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      });
    });
  });

  describe('search', () => {
    it('should return posts that match the search keyword', async () => {
      const keyword = 'Title';
      const posts: IPost[] = [{ id: '1', title: 'Title', description: 'Description' }];
      mockRepository.find.mockResolvedValue(posts);

      const result = await postRepository.search(keyword);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: [
          { title: expect.anything() },
          { description: expect.anything() },
        ],
      });
      expect(result).toEqual(posts);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const post: IPost = { id: '1', title: 'Updated Title', description: 'Updated Description' };
      await postRepository.update(post);

      expect(mockRepository.update).toHaveBeenCalledWith(post.id, {
        title: post.title,
        description: post.description,
      });
    });
  });
});
