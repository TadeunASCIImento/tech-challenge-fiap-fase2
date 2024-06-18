import { PostRepository } from "../../repositories/post.repository";
import { FindPostUseCase } from "../find-post";

export function makeFindPostUseCase() {
    const postRepository = new PostRepository();
    const findPostUseCase = new FindPostUseCase(postRepository);

    return findPostUseCase;
}