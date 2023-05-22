import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Contact } from "../entities";
import {
  contactSchema,
  returnAllContactSchema,
  returnContactSchema,
} from "../schemas/contact.schema";

export type IContact = z.infer<typeof contactSchema>;
export type IContactReturn = z.infer<typeof returnContactSchema>;
export type IAllContactReturn = z.infer<typeof returnAllContactSchema>;
export type iContactRepo = Repository<Contact>;
export type IUpdateContact = DeepPartial<IContact>;
