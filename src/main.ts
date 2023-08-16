import { NestFactory } from '@nestjs/core';
import { AppModule } from '@backend/app.module';
import { env } from './app.env';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  await app.listen(env.PORT,env.HOST,()=>{
    logger.log(`Server running on http://${env.HOST}:${env.PORT}`);
  });
}
bootstrap();
