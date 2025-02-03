import { Injectable } from '@nestjs/common';
import { ProductsPaymentDto } from './dto/products-payment.dto';
import { JwtPayload } from 'src/common/interfaces';

@Injectable()
export class MercadopagoService {

    async productsPayment(productsPaymentDto: ProductsPaymentDto, jwtPayload: JwtPayload) {
        
    }
}
