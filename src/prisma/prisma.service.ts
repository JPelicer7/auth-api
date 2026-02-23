// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//     async onModuleInit() {
//         await this.$connect();
//     }
// }




import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Garante que o process.env funcione

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // cria a conexão bruta com o Postgres usando a lib 'pg'
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // passa o adapter para o PrismaClient
    super({
      adapter: new PrismaPg(pool),
    });

    console.log('✅ Tentando conectar com Adapter em:', process.env.DATABASE_URL);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}