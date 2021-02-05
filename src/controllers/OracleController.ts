import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default {
  async index(_request: Request, response: Response): Promise<void> {
    const manager = getManager('oracledb');
    const users = await manager.query('select * from usuariosistema');

    response.json({ users });
    return;
  }
};
