import express from "express";

import { 
createPost,
findAllPosts,
findPostById,
deletePostById,
searchPostByKeyword,
updatePostById  
} from "../controllers/post/post.controller";
import { verifyToken } from "../middlewares/jwt/jwt.middleware";

const router = express.Router();

router.post('/api/posts', verifyToken, createPost)
router.get('/api/posts/admin', verifyToken ,findAllPosts)
router.get('/api/posts', findAllPosts)
router.get('/api/posts/search', searchPostByKeyword)
router.get('/api/posts/:id', findPostById)
router.put('/api/posts/:id', verifyToken, updatePostById)
router.delete('/api/posts/:id',verifyToken, deletePostById)

export default router;

