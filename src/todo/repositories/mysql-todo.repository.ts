import { OkPacket } from 'mysql2';

import Logger from '../../logger/default';
import MySql from '../../db/mysql';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import { ITodoRepository } from './todo.repository';
import { ITodo } from '../entities/todo.entity';
import { ITodo as ITodoDto } from '../dto/todo.dto';

const CREATE_TODO = `
  INSERT INTO todos (name, isActive) VALUES (?, ?)
`;

const SELECT_TODOS = `
  SELECT * FROM todos
`;

const SELECT_TODO = `
  SELECT * FROM todos WHERE id = ?
`;

const UPDATE_TODO = `
  UPDATE todos 
  SET name = ?,
  isActive = ? 
  WHERE
	  id = ?
`;

const DELETE_TODO = `
  DELETE 
  FROM
	  todos 
  WHERE
	  id = ?
`;

class MySqlTodoRepository implements ITodoRepository {
  constructor(private readonly mysql: MySql, private readonly logger: Logger) {}

  createTodo = async (name: string): Promise<OkPacket> => {
    try {
      this.logger.debug('Starting db operation of todos', null);
      const result = await this.mysql.queryAsync<OkPacket>(CREATE_TODO, [
        name,
        true
      ]);
      return result;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  getTodos = async (): Promise<ITodo[]> => {
    try {
      this.logger.debug('Starting db operation of todos', null);
      const records = await this.mysql.queryAsync<Array<ITodo>>(SELECT_TODOS);
      if (records.length > 0) {
        console.log(`records:`, records);
        this.logger.info(JSON.stringify(records));
        return records;
      }
      this.logger.debug(`The records are empty`, null);
      return [];
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  getTodo = async (id: number): Promise<ITodo | null> => {
    try {
      this.logger.debug('Starting db operation of todo', null);
      const records = await this.mysql.queryAsync<Array<ITodo>>(SELECT_TODO, [
        id
      ]);
      if (records.length > 0) {
        this.logger.info(JSON.stringify(records[0]));
        return records[0];
      }
      this.logger.debug(`The records are empty`);
      return null;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  updateTodo = async (id: number, data: ITodoDto): Promise<ITodo | null> => {
    const { name, isActive } = data;
    try {
      this.logger.debug('Starting db operation of todos', null);
      const result = await this.mysql.queryAsync<any>(UPDATE_TODO, [
        name,
        isActive,
        id
      ]);
      if (result.affectedRows == 0) {
        this.logger.info(JSON.stringify(result));
        return null;
      }
      const record = { id: id, name: name, isActive: Number(isActive) };
      return record;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  deleteTodo = async (id: number): Promise<boolean> => {
    try {
      this.logger.debug('Starting db operation of todos', null);
      const result = await this.mysql.queryAsync<any>(DELETE_TODO, [id]);
      if (result.affectedRows == 0) {
        this.logger.info(JSON.stringify(result));
        return false;
      }
      console.log('deleted todo with id: ', id);
      return true;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };
}

export default MySqlTodoRepository;
