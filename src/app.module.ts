import { Logger, Module } from '@nestjs/common';
import { AppController } from '@backend/app.controller';
import { AppService } from '@backend/app.service';
import { PrismaModule, loggingMiddleware,  } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { loadAppEnv } from './app.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[loadAppEnv]
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query', 'info', 'warn','error'],
          errorFormat: 'pretty',
        },
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
