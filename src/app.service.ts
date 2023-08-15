import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient, extendPrismaService } from './prisma.extended';

@Injectable()
export class AppService implements OnModuleInit{

  private static logger = new Logger(AppService.name);
  private readonly prismaService: ExtendedPrismaClient;

  constructor(
    prismaService: PrismaService
  ) {
    this.prismaService = extendPrismaService(prismaService);
  }
  async onModuleInit ()
  {
    AppService.logger.log('onModuleInit');
    await this.prismaService.user.paginate({
      limit:1
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
