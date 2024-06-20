import { PostRepository } from "../../repositories/typeorm/post.repository";
import { PostUseCaseHandlers } from "../post.use.case";


export function makePostUseCaseHandler() {
    const postRepository = new PostRepository();
    const postUseCaseHandler = new PostUseCaseHandlers(postRepository);

    return postUseCaseHandler;
}
