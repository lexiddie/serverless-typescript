import 'source-map-support/register';

import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler
} from './product.controller';

export const createProduct = createProductHandler;
export const getProducts = getProductsHandler;
export const getProduct = getProductHandler;
export const updateProduct = updateProductHandler;
export const deleteProduct = deleteProductHandler;
