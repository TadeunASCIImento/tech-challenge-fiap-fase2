import { IPost } from '../../entities/interfaces/post.interface';
import { IPostRepository } from '../../repositories/interfaces/post.repository.interface';
import { PostUseCaseHandlers } from '../../use-cases/post.use.case';

describe('PostUseCaseHandlers', () => {
  let repository: jest.Mocked<IPostRepository>;
  let useCaseHandlers: PostUseCaseHandlers;
  const mockPost: IPost = { id: '1', title: 'Test Title', description: 'Test Description' };

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      search: jest.fn(),
      update: jest.fn(),
    };
    useCaseHandlers = new PostUseCaseHandlers(repository);
  });

  it('should call save on repository when handlerCreate is called', async () => {
    await useCaseHandlers.handlerCreate(mockPost);
    expect(repository.save).toHaveBeenCalledWith(mockPost);
  });

  it('should call delete on repository when handlerDelete is called', async () => {
    const id = '1';
    await useCaseHandlers.handlerDelete(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should call findById on repository when handlerFind is called', async () => {
    const id = '1';
    await useCaseHandlers.handlerFind(id);
    expect(repository.findById).toHaveBeenCalledWith(id);
  });

  it('should call findAll on repository when handlerFindAll is called', async () => {
    const page = 1;
    const limit = 10;
    await useCaseHandlers.handlerFindAll(page, limit);
    expect(repository.findAll).toHaveBeenCalledWith(page, limit);
  });

  it('should call search on repository when handlerSearch is called', async () => {
    const keyword = 'Test';
    await useCaseHandlers.handlerSearch(keyword);
    expect(repository.search).toHaveBeenCalledWith(keyword);
  });

  it('should call update on repository when handlerUpdate is called', async () => {
    await useCaseHandlers.handlerUpdate(mockPost);
    expect(repository.update).toHaveBeenCalledWith(mockPost);
  });
});
