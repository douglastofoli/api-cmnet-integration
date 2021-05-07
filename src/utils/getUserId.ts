import jwt from 'jsonwebtoken';

import jwtConfig from '../configs/jwtConfig';

interface IUserData {
  userId: number;
}

const getUserId = (userToken: string): IUserData => {
  const decoded = jwt.verify(userToken, jwtConfig.jwtSecret);
  return decoded as IUserData;
};

export default getUserId;
