import express from 'express';
import { body } from 'express-validator';
import { signin, signup } from './auth.controller';
import { validateRequest } from './middlewares/validate-request.middleware';

const router = express.Router();

router.post('/signup',
  [
    body('email').isEmail().withMessage('The value must be an email'),
    body('password').isLength({ min: 4, max: 20 }).withMessage('The password must conatin between 4 and 20 characters'),
  ],
  validateRequest,
  signup  
);

router.post('/signin',
  [
    body('email').isEmail().withMessage('The value must be an email'),
    body('password').trim().notEmpty().withMessage('Must provide a password'),
  ],
  validateRequest,
  signin
);
// router.get('/logout', logout);
// router.get('/me', getMe);

export default router;
