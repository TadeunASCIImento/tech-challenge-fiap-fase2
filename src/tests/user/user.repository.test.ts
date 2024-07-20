import { UserRepository } from '../../repositories/typeorm/user.repository';
import { User } from '../../entities/user.entity';
import { appDataSource } from '../../lib/orm/typeorm.config';
import { Repository } from 'typeorm';
import { IUser } from '../../entities/interfaces/user.interface';

jest.mock('../../lib/orm/typeorm.config', () => ({
    appDataSource: {
      getRepository: jest.fn(),
      initialize: jest.fn(),
      destroy: jest.fn()
    }
  }));

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockRepository: jest.Mocked<Repository<User>>;

  beforeAll(() => {
    mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    (appDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    userRepository = new UserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save a user', async () => {
      const user: IUser = { 
        id: '1971e038-3c24-4d32-b193-5f96aaf073a7', 
        username: 'tnascimento', 
        password: 'password' 
    };
      mockRepository.save.mockResolvedValue(user);

      const result = await userRepository.save(user);

      expect(mockRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('find', () => {
    it('should find a user by username', async () => {
      const username = 'tnascimento';
      const user: IUser = { 
        id: '1971e038-3c24-4d32-b193-5f96aaf073a7', 
        username: 'tnascimento', 
        password: 'password' 
    };
      mockRepository.findOne.mockResolvedValue(user);

      const result = await userRepository.find(username);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      const username = 'nonexistentuser';
      mockRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.find(username);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(result).toBeNull();
    });
  });
});
