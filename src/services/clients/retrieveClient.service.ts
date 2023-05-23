import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientReturn, iClientRepo } from "../../interfaces/clients.interface";
import { returnClientSchema } from "../../schemas/clients.schema";

export const retrieveClientService = async (
  id: number
): Promise<IClientReturn> => {
  const clientRepository: iClientRepo = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id: id,
  });

  const client = returnClientSchema.parse(findClient!);

  return client;
};
