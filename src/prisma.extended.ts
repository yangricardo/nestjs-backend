import { PrismaClient } from '@prisma/client';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import prismaPaginateExtension from 'prisma-paginate';

export const extendPrismaService = (prisma: PrismaService | PrismaClient) => {
  return prisma.$extends(prismaPaginateExtension);
};

export const extendedPrismaClient = extendPrismaService(new PrismaClient());

export type ExtendedPrismaClient = typeof extendedPrismaClient;

export type ExtendedPrismaService = CustomPrismaService<ExtendedPrismaClient>;

export interface ExtendedPrismaOperation<T> {
  prisma: ExtendedPrismaClient;
  details: T;
}
