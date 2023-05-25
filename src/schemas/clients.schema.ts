import { z } from "zod";
import { ClientGender } from "../entities/clients.entity";

export const clientSchema = z.object({
  name: z.string().min(3).max(127),
  email: z.string().email().max(127),
  password: z.string().max(120),
  phone: z.string().max(45),
  gender: z.nativeEnum(ClientGender),
});

export const returnClientSchema = clientSchema
  .extend({
    id: z.number(),
    registerDate: z.date().optional(),
  })
  .omit({ password: true });

export const returnAllClientSchema = returnClientSchema.array();

export const updateClientSchema = clientSchema.partial();
