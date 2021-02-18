import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import exportCSV from '../../utils/exportCSV';

export default {
  async index(request: Request, response: Response): Promise<void> {
    const diaInicial: string = request.query.diaInicial as string;
    const mesInicial: string = request.query.mesInicial as string;
    const anoInicial: string = request.query.anoInicial as string;
    const diaFinal: string = request.query.diaFinal as string;
    const mesFinal: string = request.query.mesFinal as string;
    const anoFinal: string = request.query.anoFinal as string;
    const mes: string = request.query.mes as string;
    const ano: string = request.query.ano as string;

    const manager = getManager('oracledb');

    try {
      const data = await manager.query(
        `
        SELECT
          S.PERNUMERO AS MES,
          S.PEREXERCICIO AS ANO,
          TO_CHAR(S.PLNDATDIA, 'DD/MM/YYYY') AS DATA,
          S.IDPESSOA AS CODUNIDADE,
          S.CODCENTROCUSTO,
          CC.NOME AS DESCCODCENTROCUSTO,
          C.PLACONTA AS CODCONTACONTABIL,
          DECODE(PD.PLANOME, NULL, C.PLANOME, PD.PLANOME) AS DESCCONTACONTABIL,
          S.NUMDOC,
          DECODE(NVL(S.MOV, 0.00), 0.00, ' ', DECODE(SIGN(S.MOV), -1.00, 'C', 'D' )) AS NATUREZA,
          S.MOV AS VALOR,
          S.LACHIST1 AS HISTORICO
        FROM
          PLANOCONTA C,
          (
          SELECT
            P.PLATIPO,
            P.PLAINATIVA,
            P.PLANOME,
            P.PLACONTA,
            P.PLANO
          FROM
            PLANOCONTAPER P,
            (
            SELECT
              PLACONTA,
              PLANO,
              MIN(LPAD(LPAD(TO_CHAR(NVL(PERNUMERO, 0)), 2, '0'), 6, TO_CHAR(PEREXERCICIO))) AS PERNUMERO
            FROM
              PLANOCONTAPER
            WHERE
              (PEREXERCICIO = TO_NUMBER(SUBSTR('${ano}${mes}', 1, 4)))
              AND (PERNUMERO = TO_NUMBER(SUBSTR('${ano}${mes}', 5, 2)))
              AND (IDPESSOA = 3)
            GROUP BY
              PLACONTA,
              PLANO) PX
          WHERE
            (P.PLACONTA = PX.PLACONTA)
            AND (P.PLANO = PX.PLANO)
            AND (P.IDPESSOA = 3)
            AND (P.PEREXERCICIO = TO_NUMBER(SUBSTR(PX.PERNUMERO, 1, 4)))
            AND (P.PERNUMERO = TO_NUMBER(SUBSTR(PX.PERNUMERO, 5, 2)))) PD,
          (
          SELECT
            C.PLACONTA,
            L.CODCENTROCUSTO,
            SUM(DECODE(L.LACDEBCRE, 'D', L.LACVALOR, L.LACVALOR * -1)) AS SALDOANT
          FROM
            PLANOCONTA C,
            LANCAMENTO L,
            PLANILHA P
          WHERE
            (L.PLACONTA LIKE RTRIM(C.PLACONTA) || '%')
            AND (L.PLANO = C.PLANO)
            AND (P.PLNCODIGO = L.PLNCODIGO)
            AND (P.PEREXERCICIO = ${ano})
            AND (P.PLNDATDIA < TO_DATE('${diaInicial}/${mesInicial}/${anoInicial}', 'dd/mm/yyyy'))
            AND (P.PLNDATDIA >= TO_DATE('${diaFinal}/${mesFinal}/${anoFinal}', 'dd/mm/yyyy'))
            AND (P.IDPESSOA = 3)
            AND (L.PLANO = 1)
            AND (L.PLACONTA >= '0                 ')
            AND (L.PLACONTA <= '999999999999999999')
            AND (C.PLATIPO = 'A')
          GROUP BY
            C.PLACONTA,
            L.CODCENTROCUSTO) SA,
          (
          SELECT
            PLACONTA,
            SUM(TO_NUMBER(DECODE(PLSDEBITOCORRENTE, NULL, 0.00, PLSDEBITOCORRENTE)) - TO_NUMBER(DECODE(PLSCREDITOCOR, NULL, 0.00, PLSCREDITOCOR))) AS SALDOAN
          FROM
            PLANOSALDO
          WHERE
            (PEREXERCICIO = ${ano})
            AND ((PERNUMERO IS NULL)
            OR (PERNUMERO < 1))
            AND (IDPESSOA = 3)
            AND (PLANO = 1)
            AND (PLACONTA >= '0                 ')
            AND (PLACONTA <= '999999999999999999')
          GROUP BY
            PLACONTA ) SN,
          (
          SELECT
            C.PLACONTA,
            P.PERNUMERO,
            P.PEREXERCICIO,
            P.IDPESSOA,
            L.LACHIST1,
            P.PLNDATDIA,
                NVL(L.LACNUMDOC, TO_CHAR(P.PLNDATDIA, 'DD/MM/YYYY')) AS NUMDOC,
            SUM(DECODE(L.LACDEBCRE, 'D', L.LACVALOR, 0.00)) AS DEB,
            SUM(DECODE(L.LACDEBCRE, 'C', L.LACVALOR, 0.00)) AS CRED,
            SUM(DECODE(C.PLATIPO, 'A', DECODE(L.LACDEBCRE, 'D', L.LACVALOR, 0.00), 0.00)) AS DEBA,
            SUM(DECODE(C.PLATIPO, 'A', DECODE(L.LACDEBCRE, 'C', L.LACVALOR, 0.00), 0.00)) AS CREDA,
            SUM(DECODE(L.LACDEBCRE, 'D', L.LACVALOR, L.LACVALOR*-1)) AS MOV ,
            L.CODCENTROCUSTO
          FROM
            PLANOCONTA C,
            LANCAMENTO L,
            PLANILHA P
          WHERE
            (L.PLACONTA LIKE RTRIM(C.PLACONTA) || '%')
            AND (L.PLANO = C.PLANO)
            AND (P.PLNCODIGO = L.PLNCODIGO)
            AND (P.PEREXERCICIO = ${ano})
            AND (P.PLNDATDIA >= TO_DATE('${diaInicial}/${mesInicial}/${anoInicial}', 'dd/mm/yyyy'))
            AND (P.PLNDATDIA <= TO_DATE('${diaFinal}/${mesFinal}/${anoFinal}', 'dd/mm/yyyy'))
            AND (P.IDPESSOA = 3)
            AND (L.PLANO = 1)
            AND (L.PLACONTA >= '0                 ')
            AND (L.PLACONTA <= '999999999999999999')
            AND (C.PLATIPO = 'A')
          GROUP BY
            C.PLACONTA,
            L.CODCENTROCUSTO,
            P.PERNUMERO,
            P.PEREXERCICIO,
            P.IDPESSOA,
            L.LACHIST1,
            P.PLNDATDIA,
            L.LACNUMDOC) S,
          CENTCUST CC
        WHERE
          (C.PLACONTA = S.PLACONTA(+))
          AND (C.PLACONTA = SA.PLACONTA(+))
          AND (C.PLACONTA = SN.PLACONTA(+))
          AND (C.PLACONTA = PD.PLACONTA(+))
          AND (C.PLANO = PD.PLANO(+))
          AND (C.PLAGRAU <= 6)
          AND (C.PLANO = 1)
          AND (C.PLACONTA >= '0                 ')
          AND (C.PLACONTA <= '999999999999999999')
          AND (CC.CODCENTROCUSTO = S.CODCENTROCUSTO)
          AND (CC.IDEMPRESA = 3)
        GROUP BY
          C.PLACONTA,
          SA.SALDOANT,
          SN.SALDOAN,
          C.PLAGRAU,
          C.PLATIPO,
          C.PLANATUREZA,
          C.PLANOMEOUTLING,
          PD.PLANOME,
          C.PLANOME,
          C.PLACONCORRESP,
          S.DEB,
          S.CRED,
          S.DEBA,
          S.CREDA,
          S.MOV,
          S.CODCENTROCUSTO,
          CC.NOME,
          S.PERNUMERO,
          S.PEREXERCICIO,
          S.IDPESSOA,
          S.LACHIST1,
          S.PLNDATDIA,
          S.NUMDOC
        HAVING
          ((DECODE(NVL(S.DEB, 0.00), 0.00, (DECODE(NVL(S.CRED, 0.00), 0.00, (DECODE(NVL(SN.SALDOAN, 0.00), 0.00, (DECODE(NVL(SA.SALDOANT, 0.00), 0.00, '0', '1')), '1')), '1')), '1')) = '1')
        ORDER BY
          C.PLACONTA
        `
      );

      const formatedData = exportCSV('DRE', mes, ano, data);

      response.status(200).json({ data: formatedData });
      return;
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
};
