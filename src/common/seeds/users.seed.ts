import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/common/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

export class SeedUsers {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const usersData = [
      {
        name: 'Admin',
        email: 'admin@correo.com',
        password: bcrypt.hashSync('admin', 10),
        role: Roles.ADMIN,
        is_deleted: false,
        created_at: new Date(),
        updated_by: 0,
        updated_at: new Date(),
      },
      {
        name: 'Seller1',
        email: 'seller1@correo.com',
        password: bcrypt.hashSync('seller1', 10),
        role: Roles.SELLER,
        is_deleted: false,
        created_at: new Date(),
        updated_by: 0,
        updated_at: new Date(),
      },
      {
        name: 'Seller2',
        email: 'seller2@correo.com',
        password: bcrypt.hashSync('seller2', 10),
        role: Roles.SELLER,
        is_deleted: false,
        created_at: new Date(),
        updated_by: 0,
        updated_at: new Date(),
      },
      {
        name: 'Client1',
        email: 'client1@correo.com',
        password: bcrypt.hashSync('client1', 10),
        role: Roles.CLIENT,
        is_deleted: false,
        created_at: new Date(),
        updated_by: 0,
        updated_at: new Date(),
      },
      {
        name: 'Client2',
        email: 'client2@correo.com',
        password: bcrypt.hashSync('client2', 10),
        role: Roles.CLIENT,
        is_deleted: false,
        created_at: new Date(),
        updated_by: 0,
        updated_at: new Date(),
      },
    ];

    for (const user of usersData) {
      const userExists = await userRepository.findOneBy({
        email: user.email,
      });

      if (!userExists) {
        console.log('Creating user:', user.name);
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }

    console.log('Users created');
  }
}
