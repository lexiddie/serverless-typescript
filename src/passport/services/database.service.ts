import { OkPacket } from 'mysql2';
import { IPassport as IPassportDto } from '../dto/passport.dto';
import { IPassport } from '../entities/passport.entity';

import { IPassportRepository } from '../repositories/passport.repository';

class DatabaseService {
  constructor(private readonly passportRepository: IPassportRepository) {}

  createPassport = async (data: IPassportDto): Promise<OkPacket> => {
    return this.passportRepository.createPassport(data);
  };

  getPassports = async (): Promise<IPassport[]> => {
    return this.passportRepository.getPassports();
  };

  getPassport = async (id: number): Promise<IPassport | null> => {
    return this.passportRepository.getPassport(id);
  };

  updatePassport = async (
    id: number,
    data: IPassportDto
  ): Promise<IPassport | null> => {
    return this.passportRepository.updatePassport(id, data);
  };

  deletePassport = async (id: number): Promise<boolean> => {
    return this.passportRepository.deletePassport(id);
  };
}

export default DatabaseService;
