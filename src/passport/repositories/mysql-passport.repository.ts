import { OkPacket } from 'mysql2';

import Logger from '../../logger';
import MySql from '../../db/mysql';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import { IPassportRepository } from './passport.repository';
import { IPassport as IPassportDto } from '../dto/passport.dto';
import { IPassport } from '../entities/passport.entity';

const CREATE_PASSPORT = `
  INSERT INTO passports (name, birthday, citizenship, occupation, source) VALUES (?, ?, ?, ?, ?)
`;

const SELECT_PASSPORTS = `
  SELECT * FROM passports
`;

const SELECT_PASSPORT = `
  SELECT * FROM passports WHERE id = ?
`;

const UPDATE_PASSPORT = `
  UPDATE passports 
  SET name = ?,
  birthday = ?,
  citizenship = ?,
  occupation = ? 
  WHERE
	  id = ?
`;

const DELETE_PASSPORT = `
  DELETE 
  FROM
	  passports
  WHERE
	  id = ?
`;

class MySqlPassportRepository implements IPassportRepository {
  constructor(private readonly mysql: MySql, private readonly logger: Logger) {}

  createPassport = async (data: IPassportDto): Promise<OkPacket> => {
    const { name, birthday, citizenship, occupation, source } = data;
    try {
      this.logger.debug('Starting db operation of passports', null);
      const result = await this.mysql.queryAsync<OkPacket>(CREATE_PASSPORT, [
        name,
        new Date(birthday),
        citizenship,
        occupation,
        source
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

  getPassports = async (): Promise<IPassport[]> => {
    try {
      this.logger.debug('Starting db operation of passports', null);
      const records = await this.mysql.queryAsync<IPassport[]>(
        SELECT_PASSPORTS
      );
      return records;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  getPassport = async (id: number): Promise<IPassport | null> => {
    try {
      this.logger.debug('Starting db operation of passports', null);
      const records = await this.mysql.queryAsync<IPassport[]>(
        SELECT_PASSPORT,
        [id]
      );
      if (records.length > 0) {
        return records[0];
      }
      return null;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  updatePassport = async (
    id: number,
    data: IPassportDto
  ): Promise<IPassport | null> => {
    const { name, birthday, citizenship, occupation } = data;
    try {
      this.logger.debug('Starting db operation of passports', null);
      const result = await this.mysql.queryAsync<OkPacket>(UPDATE_PASSPORT, [
        name,
        new Date(birthday),
        citizenship,
        occupation,
        id
      ]);
      if (result.affectedRows == 0) {
        this.logger.info(JSON.stringify(result));
        return null;
      }
      const passport = { id, ...data };
      return passport;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new InternalServerErrorException(
        error,
        'Error while doing db operations'
      );
    }
  };

  deletePassport = async (id: number): Promise<boolean> => {
    try {
      this.logger.debug('Starting db operation of passports', null);
      const result = await this.mysql.queryAsync<OkPacket>(DELETE_PASSPORT, [
        id
      ]);
      if (result.affectedRows == 0) {
        this.logger.info(JSON.stringify(result));
        return false;
      }
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

export default MySqlPassportRepository;
