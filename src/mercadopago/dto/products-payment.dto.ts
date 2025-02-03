import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductPaymentInfo } from 'src/common/interfaces';

export class ProductsPaymentDto {
    @IsArray()
    @ValidateNested({ each: true })
    products: ProductPaymentInfo[];
}