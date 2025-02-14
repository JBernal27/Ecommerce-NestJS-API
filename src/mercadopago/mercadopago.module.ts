import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { JwtService } from '@nestjs/jwt';
import { SalesService } from 'src/sales/sales.service';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from 'src/sales/entity/sales.entity';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sales, User])],
  controllers: [MercadopagoController],
  providers: [MercadopagoService, JwtService, SalesService, UsersService],
})
export class MercadopagoModule {}
