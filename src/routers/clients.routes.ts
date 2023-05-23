import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middeware";
import { clientSchema, updateClientSchema } from "../schemas/clients.schema";
import {
  createClientController,
  deleteClientController,
  listClientsController,
  retrieveClientsController,
  updateClientController,
} from "../controllers/clients.controllers";

export const clientsRoutes = Router();

clientsRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  createClientController
);
clientsRoutes.get("", listClientsController);

clientsRoutes.get("/:id", retrieveClientsController);

clientsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateClientSchema),
  updateClientController
);
clientsRoutes.delete("/:id", deleteClientController);
