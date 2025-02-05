import { Body, Controller, Post, Req } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { ProductsPaymentDto } from './dto/products-payment.dto';
import { necessaryRole, PrivateService } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { JwtPayload } from 'src/common/interfaces';
import { Request } from 'express';

@PrivateService()
@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {
  }

  @Post()
  @necessaryRole(Roles.CLIENT)
  productsPayment(@Body()productsPaymentDto: ProductsPaymentDto, @Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.mercadopagoService.productsPayment(productsPaymentDto, user);
  }
}
