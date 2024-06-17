import express from "express";

import { createPost } from "../http/controllers/posts/create";
import { findAllPosts } from "../http/controllers/posts/list";
import { findPostById } from "../http/controllers/posts/find";
import { deletePostById } from "../http/controllers/posts/delete";
import { searchPostByKeyword } from "../http/controllers/posts/search";
import { updatePostById } from "../http/controllers/posts/update";


const router = express.Router();

router.post('/posts', createPost)
router.get('/posts/admin', findAllPosts)
router.get('/posts', findAllPosts)
router.get('/posts/search', searchPostByKeyword)
router.get('/posts/:id', findPostById)
router.put('/posts/:id', updatePostById)
router.delete('/posts/:id', deletePostById)

export default router;

