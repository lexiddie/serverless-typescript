import { APIGatewayProxyEvent, Context, ProxyResult } from 'aws-lambda';
import { get } from 'lodash';

import MainException from '../exceptions/main.exception';
import Response from '../utils/response.utils';
import HttpStatus from '../enums/http-status.enum';
import Logger from '../logger/default';
import DatabaseService from './services/database.service';
import AppDataSource from '../db/data-source';
import { validateOrReject } from 'class-validator';
import ProductEntity from './entities/product.entity';
import TypeOrmProductRepository from './repositories/typeorm-product.repository';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

export const createProductHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const body = get(event, 'body');

  const appDataSource = new AppDataSource(logger);
  try {
    await appDataSource.initialize();
    const productDataSource = appDataSource.getRepository(ProductEntity);
    const productRepository = new TypeOrmProductRepository(
      productDataSource,
      logger
    );
    const dbService = new DatabaseService(productRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const createProduct = requestBody as CreateProductDto;
    await validateOrReject(createProduct);
    const product = await dbService.createProduct(createProduct);
    return Response.json(HttpStatus.OK, product);
  } catch (error: any) {
    logger.error('Error while create product', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};

export const getProductsHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const appDataSource = new AppDataSource(logger);
  try {
    await appDataSource.initialize();
    const productDataSource = appDataSource.getRepository(ProductEntity);
    const productRepository = new TypeOrmProductRepository(
      productDataSource,
      logger
    );
    const dbService = new DatabaseService(productRepository);
    const products = await dbService.getProducts();
    return Response.json(HttpStatus.OK, products);
  } catch (error: any) {
    logger.error('Error while get products', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};

export const getProductHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const productId = get(event, 'pathParameters.productId');
  const appDataSource = new AppDataSource(logger);

  try {
    await appDataSource.initialize();
    const productDataSource = appDataSource.getRepository(ProductEntity);
    const productRepository = new TypeOrmProductRepository(
      productDataSource,
      logger
    );
    const dbService = new DatabaseService(productRepository);
    const product = await dbService.getProduct(productId);
    return Response.json(HttpStatus.OK, product);
  } catch (error: any) {
    logger.error('Error while get product', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};

export const updateProductHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const productId = get(event, 'pathParameters.productId');
  const body = get(event, 'body');

  const appDataSource = new AppDataSource(logger);
  try {
    await appDataSource.initialize();
    const productDataSource = appDataSource.getRepository(ProductEntity);
    const productRepository = new TypeOrmProductRepository(
      productDataSource,
      logger
    );
    const dbService = new DatabaseService(productRepository);
    const requestBody = body ? JSON.parse(body) : null;
    const updateProduct = requestBody as UpdateProductDto;
    await validateOrReject(updateProduct);
    const product = await dbService.updateProduct(productId, updateProduct);
    return Response.json(HttpStatus.OK, product);
  } catch (error: any) {
    logger.error('Error while update product', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};

export const deleteProductHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<ProxyResult> => {
  const logger = new Logger(event, context);
  logger.info(`api call received`, { event, context });

  const productId = get(event, 'pathParameters.productId');
  const appDataSource = new AppDataSource(logger);

  try {
    await appDataSource.initialize();
    const productDataSource = appDataSource.getRepository(ProductEntity);
    const productRepository = new TypeOrmProductRepository(
      productDataSource,
      logger
    );
    const dbService = new DatabaseService(productRepository);
    const product = await dbService.deleteProduct(productId);
    return Response.json(HttpStatus.OK, product);
  } catch (error: any) {
    logger.error('Error while delete product', error);
    const mainException = new MainException(error, event);
    return mainException.response();
  } finally {
    await appDataSource.destroy();
    logger.info('Data source connection is closed', null);
  }
};
