import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import {
  IContact,
  IContactReturn,
  iContactRepo,
} from "../../interfaces/contact.interface";
import { returnContactSchema } from "../../schemas/contact.schema";

export const createContactService = async (
  contactData: IContact
): Promise<IContactReturn> => {
  const contactRepository: iContactRepo = AppDataSource.getRepository(Contact);

  const contact: Contact = contactRepository.create(contactData);

  await contactRepository.save(contact);

  const newContact = returnContactSchema.parse(contact);

  return newContact;
};
