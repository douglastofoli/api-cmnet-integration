import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export default {
  async index(request: Request, response: Response): Promise<void> {
    const { email } = request.body;

    try {
      const manager = getManager(process.env.DB3_NAME);
      const data = await manager.query(
        `
        SELECT
          DISTINCT frav.id,
          frav.CODIGO,
          p.NOME,
          frav.STATUS,
          p.EMAIL
        FROM
          FRATENDIMENTOVENDA frav
        INNER JOIN FRATENDIMENTO fra ON
          frav.FRATENDIMENTO = fra.id
        INNER JOIN FRPESSOA frp ON
          frav.FRPESSOA1 = frp.ID
        INNER JOIN PESSOA p ON
          frp.PESSOA = p.ID
        WHERE
          frav.STATUS = 'A'
          AND frav.FILIAL = 2
          ${email ? `AND p.EMAIL = '${email}'` : ''}
      `
      );

      if (Object.keys(data).length === 0) {
        response.status(404).json({ error: 'E-mail não encontrado!' });
        return;
      }

      response.json({ data });
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Não foi possível retornar os dados.' });
    }
  },

  async getUhs(request: Request, response: Response): Promise<void> {
    try {
      const manager = getManager(process.env.DB4_NAME);
      const data = await manager.query('select * from uh');

      if (Object.keys(data).length === 0) {
        response.status(404).json({ error: 'Nenhum dado encontrado!' });
        return;
      }

      response.json({ data });
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Não foi possível retornar os dados.' });
    }
  },

  async updateStatus(request: Request, response: Response): Promise<void> {
    const { numero, status } = request.body;

    try {
      const manager = getManager(process.env.DB4_NAME);
      const response = await manager.query(
        `
        update uh set StatusGovernanca = ${status} where Numero = ${numero}
        `
      );

      response.json({ response });
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  },

  async teste(request: Request, response: Response): Promise<void> {
    response.status(200).json({ mensagem: 'Deu certo' });
  }
};
