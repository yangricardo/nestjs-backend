import { PageResultDTO, PageResultSchema } from "@backend/page-result.dto";
import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
})


export class UserDTO extends createZodDto(UserSchema) {
  @ApiProperty({
    description: 'User id',
  })
  id: string;
  @ApiProperty({
    description: 'User name',
  })
  name: string;
  @ApiProperty({
    description: 'User email',
  })
  email: string;
}


export const PageUserResultSchema = PageResultSchema.extend({
  result: z.array(UserDTO.schema),
})

export class PageUserResultDTO extends createZodDto(PageUserResultSchema) implements PageResultDTO<UserDTO>{
  @ApiProperty({
    description: 'User result list',
    type: [UserDTO],
  })
  result: UserDTO[];
  @ApiProperty({
    description: 'The next page number',
    type: Number,
  })
  totalPages: number;
  @ApiProperty({
    description: 'Has next page?',
    type: Boolean,
  })
  hasNextPage: boolean;
  @ApiProperty({
    description: 'Has previous page?',
    type: Boolean,
  })
  hasPrevPage: boolean;
  @ApiProperty({
    description: 'The total count of the results',
    type: Number,
  })
  count: number;
  @ApiProperty({
    description: 'Exceed count?',
    type: Boolean,
  })
  exceedCount: boolean;
  @ApiProperty({
    description: 'Exceed total pages?',
    type: Boolean,
  })
  exceedTotalPages: boolean;
  @ApiProperty({
    description: 'The current page number',
    type: Number,
  })
  page: number;
  @ApiProperty({
    description: 'The limit of the results',
    type: Number,
  })
  limit: number;
}