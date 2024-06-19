import { PostRepository } from '../../lib/typeorm/post.repository';
import { FindAllPostUseCase } from "../list-posts";

export function makeFindAllPostUseCase() {
    const postRepository = new PostRepository();
    const findAllPostUseCase = new FindAllPostUseCase(postRepository);

    return findAllPostUseCase;
}