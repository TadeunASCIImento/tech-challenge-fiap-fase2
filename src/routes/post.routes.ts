import express from "express";

import { 
createPost,
findAllPosts,
findPostById,
deletePostById,
searchPostByKeyword,
updatePostById  
} from "../controllers/post.controller";

const router = express.Router();

router.post('/api/posts', createPost)
router.get('/api/posts/admin', findAllPosts)
router.get('/api/posts', findAllPosts)
router.get('/api/posts/search', searchPostByKeyword)
router.get('/api/posts/:id', findPostById)
router.put('/api/posts/:id', updatePostById)
router.delete('/api/posts/:id', deletePostById)

export default router;

