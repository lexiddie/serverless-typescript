import CreateUserDto from '../dto/create-user.dto';
import UserEntity from '../entities/user.entity';
import { IUserRepository } from '../repositories/user.repository';

class DatabaseService {
  constructor(private readonly userRepository: IUserRepository) {}

  createUser = async (data: CreateUserDto): Promise<UserEntity> => {
    return this.userRepository.createUser(data);
  };
}

export default DatabaseService;
