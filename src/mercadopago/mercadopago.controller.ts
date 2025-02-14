import { Body, Controller, Post, Query, Req } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { ProductsPaymentDto } from './dto/products-payment.dto';
import {
  necessaryRole,
  PrivateService,
} from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { JwtPayload } from 'src/common/interfaces';
import { Request } from 'express';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}
  
  @Post()
  @PrivateService()
  @necessaryRole(Roles.CLIENT)
  productsPayment(
    @Body() productsPaymentDto: ProductsPaymentDto,
    @Req() req: Request,
  ) {
    const user = req.user as JwtPayload;
    return this.mercadopagoService.productsPayment(productsPaymentDto, user);
  }

  @Post('confirm')
  confirmPayment(
    @Query() query: any,
  ) {
    return this.mercadopagoService.confirmPayment(query);
  }
}
