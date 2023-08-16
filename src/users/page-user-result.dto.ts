import { PageResultDTO, PageResultSchema } from '@backend/page-result.dto';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UserSchema = z
  .object({
    id: z.string().cuid().describe('User id'),
    name: z.string().describe('User name'),
    email: z.string().email().describe('User email'),
  })
  .describe('User Data');

export class UserDTO extends createZodDto(UserSchema) {}

export const PageUserResultSchema = PageResultSchema.extend({
  result: z.array(UserDTO.schema.describe('User Data')).describe('Result List'),
}).describe('User Page Result');

export class PageUserResultDTO
  extends createZodDto(PageUserResultSchema)
  implements PageResultDTO<UserDTO> {}
