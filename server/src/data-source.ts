import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Otp } from './otp/entities/otp.entity';

const AppDataSource = new DataSource({
  type: 'mysql', // or your DB type
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'payment-share',
  entities: [User, Otp],
  synchronize: false,
  migrations: ['src/db/migrations/*.ts'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});

module.exports = AppDataSource;
// default export
export default AppDataSource;