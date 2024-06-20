import express  from 'express';
import { createUser } from '../controllers/user/user.controller';

const router = express.Router();

router.post('/api/user', createUser);

export default router;