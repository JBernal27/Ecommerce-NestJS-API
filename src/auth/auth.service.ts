import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByEmail(
      email.toLocaleLowerCase(),
    );
    if (!user) {
      throw new NotFoundException(
        'User not found, Verify your credentials or complete the registration',
      );
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    console.log(pass);
    console.log(user?.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new NotFoundException(
        'User not found, Verify your credentials or complete the registration',
      );
    }
    delete user.password;
    return user;
  }

  async register(CreateUserDto: CreateUserDto) {
    console.log(CreateUserDto);
    const user = await this.usersService.findByEmail(CreateUserDto.email);
    console.log(user);
    if (user) {
      throw new NotFoundException('User already exists');
    }
    return this.usersService.create(CreateUserDto);
  }

  async login(user: Partial<User>) {
    try {
      const verifiedUser = await this.validateUser(user.email, user.password);

      const payload = {
        id: verifiedUser.id,
        doc_number: verifiedUser.doc_number,
        name: verifiedUser.name,
        email: verifiedUser.email,
        specialty: verifiedUser.specialty,
        role: verifiedUser.role,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
