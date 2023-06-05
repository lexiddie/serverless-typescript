import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import BadRequestException from '../../exceptions/bad-request.exception';
import Logger from '../../logger';
import CreateProductDto from '../dto/create-product.dto';
import UpdateProductDto from '../dto/update-product.dto';
import ProductEntity from '../entities/product.entity';
import { IProductRepository } from './product.repository';

class TypeOrmProductRepository implements IProductRepository {
  constructor(
    private readonly productDataSource: Repository<ProductEntity>,
    private readonly logger: Logger
  ) {}

  createProduct = async (data: CreateProductDto): Promise<ProductEntity> => {
    try {
      const product = await this.productDataSource.save(
        this.productDataSource.create(data)
      );
      this.logger.info(`product has been created`, product);
      return product;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };

  getProducts = async (): Promise<ProductEntity[]> => {
    try {
      const products = await this.productDataSource.find();
      this.logger.info(`products have been found`, products.length);
      return products;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };

  getProduct = async (productId: string): Promise<ProductEntity | null> => {
    try {
      const product = await this.productDataSource.findOneBy({
        productId: productId
      });
      this.logger.info(`product has been found`, product);
      return product;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };

  updateProduct = async (
    id: number,
    update: UpdateProductDto
  ): Promise<UpdateResult> => {
    try {
      const result = await this.productDataSource.update(id, { ...update });
      this.logger.info(`product has been updated`, result);
      return result;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };

  deleteProduct = async (productId: string): Promise<DeleteResult> => {
    try {
      const result = await this.productDataSource.delete({
        productId: productId
      });
      this.logger.info(`product has been deleted`, result);
      return result;
    } catch (error: any) {
      this.logger.error('Error while doing db operations', error);
      throw new BadRequestException(error, 'Error while doing db operations');
    }
  };
}

export default TypeOrmProductRepository;
