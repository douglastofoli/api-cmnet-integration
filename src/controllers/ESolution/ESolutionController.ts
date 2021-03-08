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
        --	AND frav.FILIAL = 2
          and p.EMAIL LIKE '%${email}%'
      `
      );

      if (Object.keys(data).length === 0) {
        response.status(404).json('E-mail não encontrado!');
        return;
      }

      response.json({ data });
      return;
    } catch (error) {
      response.status(500).json({ error });
    }
  }
};
