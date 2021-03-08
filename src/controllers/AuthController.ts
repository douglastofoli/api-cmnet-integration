import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

import jwtConfig from '../configs/jwtConfig';

import User from '../entities/postgres/User';
import usersView from '../views/users_view';

export default {
  async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    // verify if exist email and password
    if (!(email && password)) {
      response
        .status(400)
        .json({ error: 'Por favor, preencha todos os campos.' });
      return;
    }

    try {
      const userRepository = getConnection('postgresdb').getRepository(User);

      const user = await userRepository.findOneOrFail({ where: { email } });

      if (!user.checkIfUserIsActivated(user.active)) {
        response.status(403).json({ error: 'Usuário não está ativado.' });
        return;
      }

      if (!user.checkIfPasswordIsValid(password)) {
        response.status(401).json({ error: 'E-mail ou senha incorretos.' });
        return;
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtConfig.jwtSecret
      );

      response.status(200).json(usersView.render(user, token));
      return;
    } catch (error) {
      console.log(error);
      response.status(401).json({ error: 'E-mail ou senha incorretos.' });
      return;
    }
  }
};
