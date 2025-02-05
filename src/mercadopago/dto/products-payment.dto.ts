import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPaymentInfo {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    product_id: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ example: 2 })
    quantity: number;
}

export class ProductsPaymentDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductPaymentInfo)
    @ApiProperty({ type: [ProductPaymentInfo] })
    products: ProductPaymentInfo[];
}