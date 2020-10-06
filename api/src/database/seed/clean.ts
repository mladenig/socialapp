import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';

const main = async () => {

  const connection = await createConnection();
  const userRepo = connection.getRepository(User);

  // Clean all data
  await userRepo.delete({});

  await connection.close();

  // tslint:disable-next-line:no-console
  console.log(`Data cleaned successfully!`);

};

main()
    // tslint:disable-next-line:no-console
  .catch(console.log);
