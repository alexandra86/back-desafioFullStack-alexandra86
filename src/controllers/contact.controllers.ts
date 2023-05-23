import { Request, Response } from "express";
import { IContact, IUpdateContact } from "../interfaces/contact.interface";
import { createContactService } from "../services/contact/createContact.service";
import { listContactService } from "../services/contact/listContact.service";
import { retrieveContactService } from "../services/contact/retrieveContact.service";
import { updateContactService } from "../services/contact/updateContact.service";
import { deleteContactService } from "../services/contact/deleteContact.service";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const contactData: IContact = request.body;

  const newContact = await createContactService(contactData);

  return response.status(201).json(newContact);
};

export const listContactsController = async (
  request: Request,
  response: Response
) => {
  const contacts = await listContactService();

  return response.json(contacts);
};

export const retrieveContactController = async (
  request: Request,
  response: Response
) => {
  const id = parseInt(request.params.id);
  const contact = await retrieveContactService(id);

  return response.json(contact);
};

export const updateContactController = async (
  request: Request,
  response: Response
) => {
  const contactData: IUpdateContact = request.body;
  const id = parseInt(request.params.id);

  const updateContact = await updateContactService(contactData, id);

  return response.json(updateContact);
};

export const deleteContactController = async (
  request: Request,
  response: Response
) => {
  const id = parseInt(request.params.id);
  await deleteContactService(id);

  return response.status(204).send();
};
