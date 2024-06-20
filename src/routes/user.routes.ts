import express  from 'express';

import { 
    createUser, 
    generateToken } 
from '../controllers/user/user.controller';

const router = express.Router();

router.post('/api/user', createUser);
router.post('/api/user/auth', generateToken)

export default router;