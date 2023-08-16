import { AppService } from '@backend/app.service';
import { ExtendedPrismaClient, extendPrismaService } from '@backend/prisma.extended';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService implements OnModuleInit {
  private logger = new Logger(AppService.name);
  private readonly prisma: ExtendedPrismaClient;

  constructor(
    prismaService: PrismaService
  ) {
    this.prisma = extendPrismaService(prismaService);
  }
  onModuleInit ()
  {
    this.logger.log('UsersService initialized');
  }

  async pageUsers(page: number, limit: number, where?: Prisma.UserWhereInput) {
    return await this.prisma.user.paginate({
      limit,
      page,
    });
  }
}
