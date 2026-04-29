import { z } from 'zod';

export const ServerUrlSchema = z.string().url();
export type ServerUrl = z.infer<typeof ServerUrlSchema>;
