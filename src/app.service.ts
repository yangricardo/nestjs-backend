import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  private static logger = new Logger(AppService.name);

  async onModuleInit() {
    AppService.logger.log('onModuleInit');
  }
}
