import express from 'express';
import { body } from 'express-validator';
import { signup } from './auth.controller';

const router = express.Router();

router.post('/signup',
  [
    body('email').isEmail().withMessage('The value must be an email'),
    body('password').isLength({ min: 4, max: 20 }).withMessage('The password must conatin between 4 and 20 characters'),
  ],
  signup  
);

// router.post('/login', login);
// router.get('/logout', logout);
// router.get('/me', getMe);

export default router;
