import { APIGatewayProxyEvent, Context, ProxyResult } from 'aws-lambda';
import { get } from 'lodash';

import MainException from '../exceptions/main.exception';
import Response from '../utils/response.utils';
import HttpStatus from '../enums/http-status.enum';
import Logger from '../logger/default';
import MySql from '../db/mysql';
import MySqlTodoRepository from './repositories/mysql-todo.repository';
import DatabaseService from './services/database.service';

export const createTodoHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  try {
    const mysql = new MySql(logger);
    const todoRepository = new MySqlTodoRepository(mysql, logger);
    const dbService = new DatabaseService(todoRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const name = requestBody.name;
    const result = await dbService.createTodo(name);
    return Response.json(HttpStatus.OK, result);
  } catch (error: any) {
    logger.error('Error while create todo', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getTodosHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  try {
    const mysql = new MySql(logger);
    const todoRepository = new MySqlTodoRepository(mysql, logger);
    const dbService = new DatabaseService(todoRepository);
    const todos = await dbService.getTodos();
    return Response.json(HttpStatus.OK, todos);
  } catch (error: any) {
    logger.error('Error while get todos', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getTodoHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const todoId = get(event, 'pathParameters.todoId');

  try {
    const mysql = new MySql(logger);
    const todoRepository = new MySqlTodoRepository(mysql, logger);
    const dbService = new DatabaseService(todoRepository);
    const todo = await dbService.getTodo(todoId);
    return Response.json(HttpStatus.OK, todo);
  } catch (error: any) {
    logger.error('Error while get todo', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const updateTodoHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const todoId: number = get(event, 'pathParameters.todoId');
  const body = get(event, 'body');

  try {
    const mysql = new MySql(logger);
    const todoRepository = new MySqlTodoRepository(mysql, logger);
    const dbService = new DatabaseService(todoRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const todo = await dbService.updateTodo(todoId, requestBody);
    return Response.json(HttpStatus.OK, todo);
  } catch (error: any) {
    logger.error('Error while update todo', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const deleteTodoHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const todoId: number = get(event, 'pathParameters.todoId');
  try {
    const mysql = new MySql(logger);
    const todoRepository = new MySqlTodoRepository(mysql, logger);
    const dbService = new DatabaseService(todoRepository);
    const status = await dbService.deleteTodo(todoId);
    return Response.json(HttpStatus.OK, status);
  } catch (error: any) {
    logger.error('Error while delete todo', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getHealthHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  try {
    return Response.json(HttpStatus.OK, 'ok');
  } catch (error: any) {
    logger.error('Error while check health', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getHelloHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  try {
    return Response.json(HttpStatus.OK, event);
  } catch (error: any) {
    logger.error('Error while get hello from event', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

const waitUntil = async () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      resolve({ status: 'working', second: '5s' });
      clearInterval(interval);
    }, 5000);
  });
};

export const getTestAsyncHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  try {
    const result = await waitUntil();
    return Response.json(HttpStatus.OK, result);
  } catch (error: any) {
    logger.error('Error while get test async', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};
