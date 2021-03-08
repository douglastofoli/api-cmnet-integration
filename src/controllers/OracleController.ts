import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export default {
  async index(_request: Request, response: Response): Promise<void> {
    const manager = getManager(process.env.DB2_NAME);
    const users = await manager.query('select * from usuariosistema');

    response.json({ users });
    return;
  }
};
