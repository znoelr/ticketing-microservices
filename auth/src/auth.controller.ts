import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { BadRequestError, RequestValidationError } from "./errors";
import { User } from "./db/models/user.model";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    throw new BadRequestError('email already in use');
  }
  const newUser = await User.build({ email, password });
  await newUser.save();
  // Generate JWT
  const token = jwt.sign({
    id: newUser._id,
    email: newUser.email,
  }, 'secret_key');
  req.session = { jwt: token };
  res.json(newUser);
}
