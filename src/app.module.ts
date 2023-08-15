import { Logger, Module } from '@nestjs/common';
import { AppController } from '@backend/app.controller';
import { AppService } from '@backend/app.service';
import { PrismaModule, loggingMiddleware,  } from 'nestjs-prisma';

@Module({
  imports: [
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
