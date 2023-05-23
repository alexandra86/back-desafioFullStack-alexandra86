import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import {
  IContactReturn,
  iContactRepo,
} from "../../interfaces/contact.interface";
import { returnContactSchema } from "../../schemas/contact.schema";

export const retrieveContactService = async (
  id: number
): Promise<IContactReturn> => {
  const contactRepository: iContactRepo = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({
    id: id,
  });

  const contact = returnContactSchema.parse(findContact!);

  return contact;
};
