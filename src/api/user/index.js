import { Router } from 'express';
import { signup,checkUserExists } from './controller';
import { registerValidator, validations } from './middleware';

const router = new Router();

router.post("/register", 
validations,
registerValidator, 
checkUserExists, 
signup);

export default router;
