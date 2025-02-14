import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/common/enums/roles.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);

    await this.userRepository.update(user.id, { updated_by: user.id });

    const finalUser = await this.userRepository.findOneBy({ id: newUser.id });

    delete finalUser.password;
    return finalUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.userRepository.findOneBy({ email });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number, user: User) {
    if (user.id !== id && user.role !== Roles.ADMIN) {
      throw new BadRequestException('You can only delete your own data');
    }
    await this.userRepository.update(id, { is_deleted: true });
    return this.userRepository.findOne({ where: { id } });
  }
}
