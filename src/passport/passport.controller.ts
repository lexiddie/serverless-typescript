import {
  APIGatewayProxyEvent,
  Context,
  ProxyResult,
  SQSEvent,
  Callback,
  SQSHandler,
  SQSBatchResponse,
  APIGatewayProxyHandler
} from 'aws-lambda';
import SQS, {
  SendMessageRequest,
  DeleteMessageRequest
} from 'aws-sdk/clients/sqs';
import SNS, { MessageAttributeMap, PublishInput } from 'aws-sdk/clients/sns';
import { get } from 'lodash';

import MainException from '../exceptions/main.exception';
import Response from '../utils/response.utils';
import HttpStatus from '../enums/http-status.enum';
import Logger from '../logger';
import MySql from '../db/mysql';
import MySqlPassportRepository from './repositories/mysql-passport.repository';
import DatabaseService from './services/database.service';
import { IPassport as IPassportDto } from './dto/passport.dto';
import { ulid } from 'ulid';
import { v4 as uuidv4 } from 'uuid';
import { getSqsQueueUrl } from '../utils/sqs-url.utils';

const deleteMessage = async (
  context: Context,
  receiptHandle: string,
  logger: Logger
) => {
  const sqs = new SQS();
  const stage = get(process, 'env.STAGE', 'offline');
  const QUEUE_URL = getSqsQueueUrl(`passport-sqs-${stage}`, context);
  const deleteParams: DeleteMessageRequest = {
    QueueUrl: QUEUE_URL,
    ReceiptHandle: receiptHandle
  };
  logger.info('SQS deleteParams', deleteParams);
  const result = await sqs.deleteMessage(deleteParams).promise();
  logger.info('Completed deleting a passport message from SQS', result);
};

export const passportWorkerHandler: SQSHandler = async (
  sqsEvent: SQSEvent,
  context: Context,
  callback: Callback
): Promise<void | SQSBatchResponse> => {
  const logger = new Logger(null, context, null, sqsEvent);
  logger.info(
    `Event: ${JSON.stringify(sqsEvent)}, Context: ${JSON.stringify(context)}`,
    null
  );
  const mysql = new MySql(logger);
  const passportRepository = new MySqlPassportRepository(mysql, logger);
  const dbService = new DatabaseService(passportRepository);
  try {
    const record = sqsEvent.Records[0];
    const receiptHandle: string = record.receiptHandle;
    const body = JSON.parse(record.body);
    const insertData =
      get(body, 'Type', null) === 'Notification'
        ? { ...JSON.parse(body.Message), source: 'SNS' }
        : { ...body, source: 'SQS' };
    console.log(`insertData:`, insertData);
    const passport = await dbService.createPassport(insertData);
    logger.info(`Completed creating a passport from SQS into DB`, passport);
    await deleteMessage(context, receiptHandle, logger);
    callback(null, { statusCode: HttpStatus.OK });
  } catch (error: any) {
    logger.error(`Error while creating a passport from SQS into DB`, error);
    callback(null, { statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
  }
};

const dispatchMessageToPassportQueue = async (
  context: Context,
  passport: IPassportDto,
  logger: Logger,
  correlationId: string
): Promise<any> => {
  const stage = get(process, 'env.STAGE', 'offline');
  const QUEUE_URL = getSqsQueueUrl(`passport-sqs-${stage}`, context);
  const record = {
    ...passport,
    correlationId: correlationId
  };
  const sendParams: SendMessageRequest = {
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(record)
  };
  logger.info(`Dispatch SQS Message Params:`, sendParams);
  const sqs = new SQS();
  return new Promise((resolve, reject) => {
    sqs.sendMessage(sendParams, (err, data) => {
      if (err) {
        logger.info(`Failed while sending a queue message into AWS SQS`, err);
        reject(err);
      } else {
        logger.info(`Successfully sent a message into AWS SQS`, data);
        resolve(data);
      }
    });
  });
};

export const dispatchPassportHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const correlationId = ulid();
  const logger = new Logger(event, context, correlationId);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  try {
    const requestBody = body ? JSON.parse(body) : null;
    console.log(`requestBody:`, requestBody);
    const result = await dispatchMessageToPassportQueue(
      context,
      requestBody as IPassportDto,
      logger,
      correlationId
    );

    const response = { body: requestBody, result: result };
    logger.info('Completed dispatch passport handler', response);
    return Response.json(HttpStatus.OK, response);
  } catch (error: any) {
    logger.error('Error while creating passport by dispatching to SQS', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

const dispatchDataToPassportTopic = async (
  passport: IPassportDto,
  logger: Logger,
  correlationId: string
): Promise<any> => {
  const passportTopic = get(process, 'env.PASSPORT_TOPIC', null);
  const record = {
    ...passport,
    correlationId: correlationId
  };

  const messageAttributes = createMessageAttributes({ uuid: uuidv4() });
  console.log(`messageAttributes`, messageAttributes);

  const sendParams: PublishInput = {
    Message: JSON.stringify(record),
    MessageAttributes: messageAttributes,
    Subject: 'passport_record',
    TopicArn: passportTopic
  };
  logger.info(`Dispatch SNS Message Params:`, sendParams);
  const sns = new SNS();
  return new Promise((resolve, reject) => {
    sns.publish(sendParams, (err, data) => {
      if (err) {
        logger.info(`Failed while sending a topic message into AWS SNS`, err);
        reject(err);
      } else {
        logger.info(`Successfully sent a message into AWS SNS`, data);
        resolve(data);
      }
    });
  });
};

const createMessageAttributes = (
  metaData: Record<string, string | number>
): MessageAttributeMap => {
  const results = Object.keys(metaData)
    .sort()
    .reduce((obj: any, key) => {
      obj[key] = {
        DataType: 'String',
        StringValue: String(metaData[key])
      };
      return obj;
    }, {});
  return results;
};

export const dispatchTopicHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const correlationId = ulid();
  const logger = new Logger(event, context, correlationId);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  try {
    const requestBody = body ? JSON.parse(body) : null;
    console.log(`requestBody:`, requestBody);
    const result = await dispatchDataToPassportTopic(
      requestBody as IPassportDto,
      logger,
      correlationId
    );

    const response = { body: requestBody, result: result };
    logger.info('Completed dispatch notification topic handler', response);
    return Response.json(HttpStatus.OK, response);
  } catch (error: any) {
    logger.error(
      'Error while creating passport by dispatching topic to SNS',
      error
    );
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const createPassportHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  try {
    const mysql = new MySql(logger);
    const passportRepository = new MySqlPassportRepository(mysql, logger);
    const dbService = new DatabaseService(passportRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const passport = await dbService.createPassport({
      ...requestBody,
      source: 'Direct'
    });
    return Response.json(HttpStatus.OK, passport);
  } catch (error: any) {
    logger.error('Error while creating passport', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getPassportsHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  try {
    const mysql = new MySql(logger);
    const passportRepository = new MySqlPassportRepository(mysql, logger);
    const dbService = new DatabaseService(passportRepository);
    const passports = await dbService.getPassports();
    return Response.json(HttpStatus.OK, passports);
  } catch (error: any) {
    logger.error('Error while get passports', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const getPassportHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const passportId: number = get(event, 'pathParameters.passportId');

  try {
    const mysql = new MySql(logger);
    const passportRepository = new MySqlPassportRepository(mysql, logger);
    const dbService = new DatabaseService(passportRepository);
    const passport = await dbService.getPassport(passportId);
    return Response.json(HttpStatus.OK, passport);
  } catch (error: any) {
    logger.error('Error while get passport', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const updatePassportHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const passportId: number = get(event, 'pathParameters.passportId');
  const body = get(event, 'body');

  try {
    const mysql = new MySql(logger);
    const passportRepository = new MySqlPassportRepository(mysql, logger);
    const dbService = new DatabaseService(passportRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const passport = await dbService.updatePassport(passportId, requestBody);
    return Response.json(HttpStatus.OK, passport);
  } catch (error: any) {
    logger.error('Error while update passport', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};

export const deletePassportHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });
  const passportId: number = get(event, 'pathParameters.passportId');
  try {
    const mysql = new MySql(logger);
    const passportRepository = new MySqlPassportRepository(mysql, logger);
    const dbService = new DatabaseService(passportRepository);
    const status = await dbService.deletePassport(passportId);
    return Response.json(HttpStatus.OK, status);
  } catch (error: any) {
    logger.error('Error while delete passport', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  }
};
