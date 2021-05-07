import { getConnection } from 'typeorm';

import History from '../entities/postgres/History';
import User from '../entities/postgres/User';

const saveLogs = async (log: string, userId: number): Promise<void> => {
  const history = new History();
  const user = new User();

  history.history = log;
  user.id = userId;
  history.user = user;

  const historyRepository = getConnection(process.env.DB1_NAME).getRepository(
    History
  );
  await historyRepository.save(history);
};

export default saveLogs;
