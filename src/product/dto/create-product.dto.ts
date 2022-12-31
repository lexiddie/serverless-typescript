import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

class CreateProductDto {
  @IsString()
  @IsOptional()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;
}

export default CreateProductDto;
