import { PostRepository } from "../../repositories/post.repository";
import { SearchPostUseCase } from "../search-post";

export function makeSearchPostUseCase() {
    const postRepository = new PostRepository();
    const searchPostUseCase = new SearchPostUseCase(postRepository);

    return searchPostUseCase;
}