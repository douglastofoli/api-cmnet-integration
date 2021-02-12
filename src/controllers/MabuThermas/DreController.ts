import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import exportCSV from '../../utils/exportCSV';

export default {
  async index(request: Request, response: Response): Promise<void> {
    const pernumero: string = request.query.pernumero as string;
    const perexercicio: string = request.query.perexercicio as string;

    const manager = getManager('oracledb');

    const data = await manager.query(
      `SELECT P.PERNUMERO, P.PEREXERCICIO, C.CODCENTROCUSTO, C.NOME
      FROM PERIODO P, CENTCUST C
      WHERE P.PERNUMERO = ${pernumero}
      AND P.PEREXERCICIO = ${perexercicio}`
    );

    exportCSV('DRE', pernumero, perexercicio, data);

    response.json({ data });
    return;
  }
};
