import 'reflect-metadata';
import 'mysql2';
import { get } from 'lodash';
import { DataSource, DataSourceOptions, EntityTarget } from 'typeorm';
import rootEntity from './root-entity';
import Logger from '../logger';

class AppDataSource {
  private dataSource: DataSource;
  private node_env: string;
  private config: DataSourceOptions;

  constructor(private readonly logger: Logger) {
    this.node_env = get(process, 'env.NODE_ENV', 'offline');
    this.config = this.init();
    this.dataSource = new DataSource(this.config);
  }

  private init = () => {
    const config: DataSourceOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [...rootEntity],
      migrationsRun: false,
      logging: get(process, 'env.SHOW_DATA_SOURCE_LOG', 'false') === 'true',
      synchronize: this.node_env === 'offline' ? true : false
    };
    return config;
  };

  getRepository = <T extends unknown>(target: EntityTarget<T>) => {
    return this.dataSource.getRepository<T>(target);
  };

  initialize = async (isLogEnable = true): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.dataSource
        .initialize()
        .then(() => {
          if (isLogEnable) {
            this.logger.info('TypeOrm initialization is successful', null);
          }
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'TypeOrm initialization is failure with an error:',
            error
          );
          reject(error);
        });
    });
  };

  destroy = async (): Promise<void> => {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  };
}

export default AppDataSource;
