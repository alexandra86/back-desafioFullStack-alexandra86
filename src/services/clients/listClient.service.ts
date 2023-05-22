import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
  IAllClientReturn,
  iClientRepo,
} from "../../interfaces/clients.interface";
import { returnAllClientSchema } from "../../schemas/clients.schema";

export const listClientsService = async (): Promise<IAllClientReturn> => {
  const userRepository: iClientRepo = AppDataSource.getRepository(Client);

  const findClients: Array<Client> = await userRepository.find();

  const clients = returnAllClientSchema.parse(findClients);
  return clients;
};
