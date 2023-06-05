import { Repository } from 'typeorm';

import BadRequestException from '../../exceptions/bad-request.exception';
import Logger from '../../logger';
import CreateUserDto from '../dto/create-user.dto';
import UserEntity from '../entities/user.entity';
import { IUserRepository } from './user.repository';

class TypeOrmUserRepository implements IUserRepository {
  constructor(
    private readonly userDataSource: Repository<UserEntity>,
    private readonly logger: Logger
  ) {}

  createUser = async (data: CreateUserDto): Promise<UserEntity> => {
    try {
      const user = await this.userDataSource.save(
        this.userDataSource.create(data)
      );
      this.logger.info(`User has been created`, user);
      return user;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };
}

export default TypeOrmUserRepository;
