import { IsNotEmpty, IsString } from 'class-validator';

class ReadProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;
}

export default ReadProductDto;
