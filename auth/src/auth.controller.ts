import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "./errors";
import { User } from "./db/models/user.model";
import { HashService } from "./services/hash.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
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
  }, process.env.JWT_KEY!);
  req.session = { jwt: token };
  res.status(201).json(newUser);
}


export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new BadRequestError('Invalid credentials');
  }
  const isValidPassword = await HashService.compare(foundUser.password, password);
  if (!isValidPassword) {
    throw new BadRequestError('Invalid credentials');
  }
  // Generate JWT
  const token = jwt.sign({
    id: foundUser._id,
    email: foundUser.email,
  }, process.env.JWT_KEY!);
  req.session = { jwt: token };
  res.status(200).json(foundUser);
}
