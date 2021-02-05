import User from '../entities/postgres/User';

interface IUserData {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}

export default {
  render(user: User, token: string): IUserData {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token
    };
  }
};
