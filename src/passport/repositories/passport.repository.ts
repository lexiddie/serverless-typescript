import { OkPacket } from 'mysql2';
import { IPassport as IPassportDto } from '../dto/passport.dto';
import { IPassport } from '../entities/passport.entity';

export interface IPassportRepository {
  createPassport(data: IPassportDto): Promise<OkPacket>;

  getPassports(): Promise<IPassport[]>;

  getPassport(id: number): Promise<IPassport | null>;

  updatePassport(id: number, data: IPassportDto): Promise<IPassport | null>;

  deletePassport(id: number): Promise<boolean>;
}
