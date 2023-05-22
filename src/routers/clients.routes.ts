import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middeware";
import { clientSchema } from "../schemas/clients.schema";
import {
  createClientController,
  listClientsController,
} from "../controllers/clients.controllers";

export const clientsRoutes = Router();

clientsRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  createClientController
);
clientsRoutes.get("", listClientsController);
clientsRoutes.patch("/:id");
clientsRoutes.delete("/:id");
