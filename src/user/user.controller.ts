import { APIGatewayProxyEvent, Context, ProxyResult } from 'aws-lambda';
import { get } from 'lodash';

import MainException from '../exceptions/main.exception';
import Response from '../utils/response.utils';
import HttpStatus from '../enums/http-status.enum';
import Logger from '../logger';
import DatabaseService from './services/database.service';
import TypeOrmUserRepository from './repositories/typeorm-user.repository';
import UserEntity from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';
import { validateOrReject } from 'class-validator';
import AppDataSource from '../db/data-source';

export const createUserHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  const appDataSource = new AppDataSource(logger);
  try {
    await appDataSource.initialize();
    const userDataSource = appDataSource.getRepository(UserEntity);
    const userRepository = new TypeOrmUserRepository(userDataSource, logger);
    const dbService = new DatabaseService(userRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const createUserDto = requestBody as CreateUserDto;
    await validateOrReject(createUserDto);
    const user = await dbService.createUser(createUserDto);
    return Response.json(HttpStatus.OK, user);
  } catch (error: any) {
    logger.error('Error while create user', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};
