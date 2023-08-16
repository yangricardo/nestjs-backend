import { StringIntNumberSchema } from "@backend/zod.schemas";
import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const PageUserQuerySchema = z.object({
  page: StringIntNumberSchema.pipe(z.number().int().positive()).default(1),
  limit: StringIntNumberSchema.pipe(z.number().int().positive()).default(10),
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