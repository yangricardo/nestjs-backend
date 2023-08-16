import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const PageResultSchema = z.object({
  result: z.array(z.any()),
  nextPage: z.function(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  count: z.number(),
  exceedCount: z.boolean(),
  exceedTotalPages: z.boolean(),
  page: z.number(),
  limit: z.number(),
})


export class PageResult<T=any> extends createZodDto(PageResultSchema) /* implements IPaginationResult  */ {
  @ApiProperty({
    description: 'The result of the query',
    type: [Object],
  })
  result: T[];
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