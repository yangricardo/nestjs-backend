import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const PageResultSchema = z.object({
  result: z.array(z.any()).describe('The result of the query'),
  totalPages: z.number().describe('Total Pages'),
  hasNextPage: z.boolean().describe('Has next page?'),
  hasPrevPage: z.boolean().describe('Has previous page?'),
  count: z.number().describe('The total count of the results'),
  exceedCount: z.boolean().describe('Exceed count?'),
  exceedTotalPages: z.boolean().describe('Exceed total pages?'),
  page: z.number().describe('The current page number'),
  limit: z.number().describe('The limit of the results'),
})


export class PageResultDTO<T=any> extends createZodDto(PageResultSchema) /* implements IPaginationResult  */ {
  result: T[];
}