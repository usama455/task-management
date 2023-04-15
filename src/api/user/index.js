import { Router } from 'express';
import { login,signup,checkUserExists } from './controller';
import { isValid, signUpVlidations, loginValidations } from './middleware';

const router = new Router();

router.post("/register", 
signUpVlidations,
isValid, 
checkUserExists, 
signup);


router.post("/login",
loginValidations,
isValid,
login);

export default router;
