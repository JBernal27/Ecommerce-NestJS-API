import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Sales } from 'src/sales/entity/sales.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Product, Sales],
    };
  }
}
