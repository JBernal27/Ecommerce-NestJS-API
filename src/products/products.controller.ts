import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  necessaryRole,
  PrivateService,
} from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'src/common/interfaces';

@Controller('products')
@PrivateService()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @necessaryRole(Roles.SELLER)
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('seller/:id')
  findBySeller(@Param('id') id: string) {
    return this.productsService.findBySeller(+id);
  }

  @Patch(':id')
  @necessaryRole(Roles.SELLER)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const user = req.user as JwtPayload;
    return this.productsService.update(+id, updateProductDto, user);
  }

  @Delete(':id')
  @necessaryRole(Roles.SELLER)
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.productsService.remove(+id, user);
  }
}
