import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageUserQueryDTO } from './page-user-query.dto';
import { UsersService } from './users.service';
import { Controller, Get, Query } from '@nestjs/common';
import { PageUserResultDTO } from './page-user-result.dto';
import { UseZodGuard } from 'nestjs-zod';

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
    operationId: 'pageUsers',    
  })
  @UseZodGuard('query',PageUserQueryDTO)
  @ApiOkResponse({
    description: 'Page Users',
    type: PageUserResultDTO
  })
  async pageUsers(
    @Query() query: PageUserQueryDTO
  ) {
    const result = PageUserResultDTO.schema.parse(
      await this.usersService.pageUsers(query.page,query.limit)
    );
    return result;
  }
}
