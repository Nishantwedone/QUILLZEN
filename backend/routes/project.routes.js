import { Router } from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMidddleware from '../middleware/auth.middleware.js';

const router = Router();


router.post('/create',
    authMidddleware.authUser,
    body('name').isString().withMessage('Name is Required'),
    projectController.createProject
)



export default router;