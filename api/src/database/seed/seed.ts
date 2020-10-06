import {createConnection} from 'typeorm';
import {User} from '../entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import {UserRoles} from '../../common/enums/user-roles';

const main = async () => {

  const connection = await createConnection();
  const userRepo = connection.getRepository(User);

  const firstAdmin = new User();
  firstAdmin.username = 'admin';
  firstAdmin.email = 'admin@admin.com';
  firstAdmin.profilePic = 'https://i.imgur.com/5X0viL8.png';
  firstAdmin.password = await bcryptjs.hashSync('admin', 10);
  firstAdmin.role = UserRoles.Admin;
  await userRepo.save(firstAdmin);

  const firstUser = new User();
  firstUser.username = 'firstUser';
  firstUser.email = 'user@user.com';
  firstUser.profilePic = 'https://i.imgur.com/5X0viL8.png';
  firstUser.password = await bcryptjs.hashSync('firstUser', 10);
  firstUser.role = UserRoles.Basic;
  await userRepo.save(firstUser);

  await connection.close();

  // tslint:disable-next-line:no-console
  console.log(`Data seeded successfully`);

};

main()
    // tslint:disable-next-line:no-console
  .catch(console.log);
