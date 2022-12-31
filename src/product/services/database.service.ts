import { UpdateResult } from 'typeorm';
import NotFoundException from '../../exceptions/not-found.exception';
import CreateProductDto from '../dto/create-product.dto';
import UpdateProductDto from '../dto/update-product.dto';
import ProductEntity from '../entities/product.entity';
import { IProductRepository } from '../repositories/product.repository';

class DatabaseService {
  constructor(private readonly productRepository: IProductRepository) {}

  createProduct = async (data: CreateProductDto): Promise<ProductEntity> => {
    return this.productRepository.createProduct(data);
  };

  getProducts = async (): Promise<ProductEntity[]> => {
    return this.productRepository.getProducts();
  };

  getProduct = async (productId: string): Promise<ProductEntity | null> => {
    return this.productRepository.getProduct(productId);
  };

  updateProduct = async (
    productId: string,
    update: UpdateProductDto
  ): Promise<UpdateResult> => {
    const product = await this.productRepository.getProduct(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID: ${productId} not found!`);
    }

    const updateProduct = await this.productRepository.updateProduct(
      product.id,
      update
    );
    return updateProduct;
  };

  deleteProduct = async (productId: string): Promise<string> => {
    const product = await this.productRepository.getProduct(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID: ${productId} not found!`);
    }

    await this.productRepository.deleteProduct(productId);

    return `${productId} is deleted successful`;
  };
}

export default DatabaseService;
