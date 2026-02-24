import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserRepository } from './repositories/user-repository';
import { prismaUserRepository } from './repositories/prisma/prismaUser-repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '180s' },
      }),
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, {
    provide: UserRepository,
    useClass: prismaUserRepository
  }]
  
}) // decorator
export class AuthModule {}
