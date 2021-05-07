import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

import User from '../entities/postgres/User';

export default {
  async create(request: Request, response: Response): Promise<void> {
    const { email, password, passwordConfirmation } = request.body;

    // verify if exist email and password and password confirmation
    if (!(email && password && passwordConfirmation)) {
      response
        .status(400)
        .json({ error: 'Por favor, preencha todos os campos.' });
      return;
    }

    try {
      const user = new User();

      if (password !== passwordConfirmation) {
        response.status(401).json({ error: 'As senhas não coincidem.' });
        return;
      }

      user.email = email;
      user.password = password;

      const errors = await validate(user);
      if (errors.length > 0) {
        response.status(401).json({ error: errors });
        return;
      }

      user.hashPassword();

      const userRepository = getConnection(process.env.DB1_NAME).getRepository(
        User
      );
      await userRepository.save(user);

      response.status(201).json({ message: 'Usuário registrado com sucesso!' });
      return;
    } catch (error) {
      response.status(409).json({ error: 'Este e-mail já está em uso!' });
      return;
    }
  }
};
