import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { iClientRepo } from "../../interfaces/clients.interface";

export const deleteClientService = async (id: number): Promise<void> => {
  const clientRepository: iClientRepo = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: id,
    },
  });

  await clientRepository.remove(client!);
};
