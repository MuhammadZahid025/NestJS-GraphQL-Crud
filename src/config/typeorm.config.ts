import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  username: 'postgres',
  type: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'graphql-crud',
  port: 5432,
  entities: ['dist/**/*.entity{.js, .ts}'],
  synchronize: false,
  migrationsRun: true,
  // logging: true,
  migrations: ['dist/src/migrations/*{.js, .ts}'],
  cli: { migrationsDir: 'src/migrations' },
};
