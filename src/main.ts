import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@backend/app.module';
import { env } from './app.env';
import { HttpStatus, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from '../package.json';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  app.setGlobalPrefix('api');

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addBearerAuth()
    .addServer(`http://${env.HOST}:${env.PORT}`)    
    .addTag('users')    
    .build();
  patchNestJsSwagger();
  const document = SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('/', app, document);

  await app.listen(env.PORT, env.HOST, () => {
    logger.log(`Server running on http://${env.HOST}:${env.PORT}`);
  });
}
bootstrap();
