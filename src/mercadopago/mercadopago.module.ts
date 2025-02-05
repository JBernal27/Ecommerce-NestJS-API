import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MercadopagoController],
  providers: [MercadopagoService, JwtService],
})
export class MercadopagoModule {}
