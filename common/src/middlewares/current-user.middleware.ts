import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface CurrentUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.jwt || '';
  if (!token) {
    next();
    return;
  }
  try {
    // Verify JWT
    const jwtPayload = jwt.verify(token, process.env.JWT_KEY!) as CurrentUserPayload;
    req.currentUser = jwtPayload;
  }
  finally {
    next();
  }
};
