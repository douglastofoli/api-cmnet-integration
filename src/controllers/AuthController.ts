import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

import User from '../entities/postgres/User';
import usersView from '../views/users_view';

export default {
  async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    // verify if exist email and password
    if (!(email && password)) {
      response.status(400).json({ error: 'Fill in all fields' });
      return;
    }

    try {
      const userRepository = getConnection('postgresdb').getRepository(User);

      const user = await userRepository.findOneOrFail({ where: { email } });

      if (!user.checkIfPasswordIsValid(password)) {
        response.status(401).json({ error: 'Incorrect email or password' });
        return;
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          jwtConfig.jwtSecret,
          { expiresIn: '1h' }
        );

        response.status(200).json(usersView.render(user, token));
        return;
      }
    } catch (error) {
      console.log(error);
      response.status(401).json({ error: 'Incorrect email or password.' });
      return;
    }
  }
};
