import { IUser } from '../../entities/interfaces/user.interface';
import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { UserUseCaseHandler } from '../../use-cases/user.use.case';

describe('UserUseCaseHandler', () => {
  let repository: jest.Mocked<IUserRepository>;
  let useCaseHandler: UserUseCaseHandler;
  const mockUser: IUser = { id: '1', username: 'testuser', password: 'password' };

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;
    useCaseHandler = new UserUseCaseHandler(repository);
  });

  it('should call save on repository when createHandler is called', async () => {
    repository.save.mockResolvedValue(mockUser);
    
    const result = await useCaseHandler.createHandler(mockUser);
    
    expect(repository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should call find on repository when findHandler is called', async () => {
    repository.find.mockResolvedValue(mockUser);
    
    const result = await useCaseHandler.findHandler(mockUser.username);
    
    expect(repository.find).toHaveBeenCalledWith(mockUser.username);
    expect(result).toEqual(mockUser);
  });

  it('should return null if user not found in findHandler', async () => {
    repository.find.mockResolvedValue(null);
    
    const result = await useCaseHandler.findHandler(mockUser.username);
    
    expect(repository.find).toHaveBeenCalledWith(mockUser.username);
    expect(result).toBeNull();
  });
});
