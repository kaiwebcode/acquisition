import { login, logout, signup } from '#controllers/auth.controller';
import express from 'express';

const router = express.Router();


router.post('/sign-up', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;
