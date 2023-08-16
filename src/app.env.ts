import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { StringIntNumberSchema } from './zod.schemas';

export const AppEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().default('localhost'),
  PORT: StringIntNumberSchema.default(3000),
  DATABASE_URL: z
    .string()
    .url()
    .startsWith('postgresql://'),
});

export class AppEnv extends createZodDto(AppEnvSchema) {}

export const loadAppEnv = () => {
  const env = AppEnvSchema.safeParse(process.env);
  if (!env.success) {
    console.error(env.error);
    process.exit(1);
  }
  return env.data;
}

export const env = loadAppEnv();
