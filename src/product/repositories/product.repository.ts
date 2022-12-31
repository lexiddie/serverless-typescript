import { DeleteResult, UpdateResult } from 'typeorm';
import CreateProductDto from '../dto/create-product.dto';
import UpdateProductDto from '../dto/update-product.dto';
import ProductEntity from '../entities/product.entity';

export interface IProductRepository {
  createProduct(data: CreateProductDto): Promise<ProductEntity>;

  getProducts(): Promise<ProductEntity[]>;

  getProduct(productId: string): Promise<ProductEntity | null>;

  updateProduct(id: number, update: UpdateProductDto): Promise<UpdateResult>;

  deleteProduct(productId: string): Promise<DeleteResult>;
}
