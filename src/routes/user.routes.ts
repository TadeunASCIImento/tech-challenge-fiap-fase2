import express  from 'express';

import { 
    createUser, 
    generateToken } 
from '../controllers/user/user.controller';
import { validateUserPermission } from '../middlewares/authorization/user.authorization';

const router = express.Router();

router.post('/api/user', createUser);
router.post('/api/user/authorization', validateUserPermission, generateToken)

export default router;