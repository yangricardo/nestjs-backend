import { StringIntNumberSchema } from "@backend/zod.schemas";
import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const PageUserQuerySchema = z.object({
  page: StringIntNumberSchema.refine(z.number().int().positive().parse).default(1).describe('page'),
  limit: StringIntNumberSchema.refine(z.number().int().positive().parse).default(10).describe('limit'),
})

export class PageUserQueryDTO extends createZodDto(PageUserQuerySchema) {

  @ApiProperty({
    description: 'page',
    default: 1,
  })
  page: number;

  @ApiProperty({
    description: 'limit',
    default: 10,
  })
  limit: number;
}