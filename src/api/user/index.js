import { Router } from 'express';
import { register } from './controller';
import { checkUserExists, registerValidator, validations } from './middleware';

const router = new Router();

router.post("/register", 
validations,
registerValidator, 
checkUserExists, 
register);

export default router;
