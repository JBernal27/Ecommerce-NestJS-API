import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDecimal,
  IsEnum,
  IsBoolean,
  IsDate,
  Min,
  IsNumber,
} from 'class-validator';
import { ProductCategory } from 'src/common/enums/categories.enum';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'REF123',
    description: 'The reference of the product.',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    example: 'This is a product description.',
    description: 'The description of the product.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 100, description: 'The quantity of the product.' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 19.99, description: 'The price of the product.' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product.',
  })
  @IsEnum(ProductCategory)
  category: ProductCategory;
}
