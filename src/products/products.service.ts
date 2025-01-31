import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    JwtPayload: JwtPayload,
  ): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: JwtPayload.id },
    });

    const product = this.productRepository.create({
      ...createProductDto,
      seller: user,
      created_by: user.id,
      updated_by: user.id,
    });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async findBySeller(id: number): Promise<Product[]> {
    return this.productRepository.find({ where: { seller: { id: id } } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    JwtPayload: JwtPayload,
  ): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: JwtPayload.id },
    });

    await this.productRepository.update(
      { id },
      { ...updateProductDto, updated_by: user.id, seller: user },
    );
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number, JwtPayload: JwtPayload): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: JwtPayload.id },
    });

    await this.productRepository.delete({ id, seller: user });
  }
}
