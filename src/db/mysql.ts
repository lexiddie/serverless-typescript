import { Connection } from 'mysql2';

import Logger from '../logger/default';
import db from './connection';

class MySql {
  private db: Connection;

  constructor(private readonly logger: Logger) {
    this.db = db();
    this.init();
  }

  init = async (): Promise<void> => {
    const createTodoTable = `
      CREATE TABLE IF NOT EXISTS todos
      (
          id INT not null AUTO_INCREMENT, 
          name varchar(100) not null, 
          isActive tinyInt not null default 1,
          PRIMARY KEY (id)
      )
    `;
    await this.queryAsync(createTodoTable);

    const createPassportTable = `
      CREATE TABLE IF NOT EXISTS passports
      (
          id INT not null AUTO_INCREMENT, 
          name varchar(100) not null, 
          birthday date not null,
          citizenship varchar(100) not null,
          occupation varchar(100) not null,
          source varchar(100) default null,
          PRIMARY KEY (id)
      )
    `;
    await this.queryAsync(createPassportTable);
  };

  queryAsync = async <T extends unknown>(
    sqlStatement: string,
    params: unknown = undefined,
    isLogEnable = true
  ): Promise<T> => {
    this.logger.debug(`Executing the query: ${sqlStatement}`, {
      methodName: 'mysql-query-async',
      params
    });

    return new Promise((resolve, reject) => {
      this.db.query(sqlStatement, params, (error, result) => {
        if (error) {
          this.logger.error(
            'an error occurred while executing the query',
            error
          );
          reject(error);
        }

        if (isLogEnable) {
          this.logger.debug('fetched database records', JSON.stringify(result));
        }
        resolve(result as T);
      });
    });
  };

  close = (): void => {
    this.db.destroy();
  };
}

export default MySql;
