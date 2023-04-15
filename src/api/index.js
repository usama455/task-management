import { Router } from 'express';
// import { token } from '../services/passport';
// import admin from './admin';
import user from './user';
import card from './card';

const router = new Router();

// router.use('/admin', token({ required: true, roles: ['admin'] }), admin);
router.use('/user', user);
router.use('/card', card);

export default router;