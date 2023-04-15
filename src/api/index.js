import { Router } from 'express';
// import { token } from '../services/passport';
// import admin from './admin';
import user from './user';
// import auth from './auth';

const router = new Router();

// router.use('/admin', token({ required: true, roles: ['admin'] }), admin);
router.use('/user', user);
// router.use('/auth', auth);

export default router;