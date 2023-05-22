import { z } from "zod";
import { ContactGender } from "../entities/contact.entity";

export const contactSchema = z.object({
  fullName: z.string().min(3).max(127),
  email: z.string().email().max(127),
  phone: z.string().max(45),
  gender: z.nativeEnum(ContactGender),
});

export const returnContactSchema = contactSchema.extend({
  id: z.number(),
  registerDate: z.string().datetime(),
});

export const returnAllContactSchema = returnContactSchema.array();

export const updateClontactSchema = contactSchema.partial();
