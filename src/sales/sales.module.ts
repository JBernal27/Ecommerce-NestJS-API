import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entity/sales.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, User, Product]), UserModule],
  controllers: [SalesController],
  providers: [SalesService, UsersService],
})
export class SalesModule {}
