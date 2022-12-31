import CreateUserDto from '../dto/create-user.dto';
import UserEntity from '../entities/user.entity';

export interface IUserRepository {
  createUser(data: CreateUserDto): Promise<UserEntity>;
}
