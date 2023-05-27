import { Request, Response } from "express";
import { IClient, IUpdateClient } from "../interfaces/clients.interface";
import { createClientService } from "../services/clients/createClient.service";
import { listClientsService } from "../services/clients/listClient.service";
import { updateClientService } from "../services/clients/updateClient.service";
import { deleteClientService } from "../services/clients/deleteClient.service";
import { retrieveClientService } from "../services/clients/retrieveClient.service";

export const createClientController = async (
  request: Request,
  response: Response
) => {
  const clientData: IClient = request.body;

  const newClient = await createClientService(clientData);

  return response.status(201).json(newClient);
};

export const listClientsController = async (_: Request, response: Response) => {
  const clients = await listClientsService();

  return response.json(clients);
};

export const retrieveClientsController = async (
  request: Request,
  response: Response
) => {
  const id = request.client.id;
  const { client, contacts } = await retrieveClientService(id);

  const clientWithContacts = {
    client: client,
    contacts: contacts,
  };

  return response.json(clientWithContacts);
};

export const updateClientController = async (
  request: Request,
  response: Response
) => {
  const clientData: IUpdateClient = request.body;
  const id = parseInt(request.params.id);

  const updateClient = await updateClientService(clientData, id);

  return response.json(updateClient);
};

export const deleteClientController = async (
  request: Request,
  response: Response
) => {
  const id = parseInt(request.params.id);
  await deleteClientService(id);

  return response.status(204).send();
};
