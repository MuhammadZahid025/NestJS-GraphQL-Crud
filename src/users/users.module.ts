import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
imports: [
  TypeOrmModule.forFeature([Users]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'secret1234',
    signOptions: {
      expiresIn: 3600,
    },
  }),
  
  
],
providers: [ UsersService,UsersResolver, JwtStrategy],
exports: [ UsersService,JwtModule],
})
export class UsersModule {}
