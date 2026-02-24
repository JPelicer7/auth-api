import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';


// @Module({
//   imports: [AuthModule],
//   controllers: [],
//   providers: [PrismaService],
// })
// export class AppModule {}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule
  ],
})
export class AppModule {}