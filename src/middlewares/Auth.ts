import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

interface IUserData {
  userId: string;
  email: string;
}

const Auth = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const token = <string>request.headers['x-access-token'];

  if (!token) {
    response.status(401).json({ error: 'Unauthorized: no token provided.' });
    return;
  }

  try {
    const jwtPayload = <IUserData>jwt.verify(token, jwtConfig.jwtSecret);
    response.locals.jwtPayload = jwtPayload;

    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, jwtConfig.jwtSecret, {
      expiresIn: '1h'
    });

    response.setHeader('x-access-token', newToken);

    next();
  } catch (error) {
    response
      .status(401)
      .json({ error: 'Unauthorized: invalid token provided' });
    return;
  }
};

export default Auth;
