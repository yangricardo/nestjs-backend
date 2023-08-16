import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageUserQueryDTO } from './page-user-query.dto';
import { UsersService } from './users.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @ApiOperation({
    description: 'Page Users',
    summary: 'pageUsers',
    operationId: 'pageUsers'
  })
  async pageUsers(
    @Query() query: PageUserQueryDTO
  ) {
    return await this.usersService.pageUsers(query.page,query.limit);
  }
}
