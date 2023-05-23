import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middeware";
import { contactSchema, updateClontactSchema } from "../schemas/contact.schema";
import {
  createContactController,
  deleteContactController,
  listContactsController,
  retrieveContactController,
  updateContactController,
} from "../controllers/contact.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureClientExistsMiddleware } from "../middlewares/ensureClientExists.middleware";

export const contactRoutes = Router();

contactRoutes.use(ensureTokenIsValidMiddleware);

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  createContactController
);
contactRoutes.get("", listContactsController);

contactRoutes.get("/:id", retrieveContactController);

contactRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateClontactSchema),
  updateContactController
);
contactRoutes.delete("/:id", deleteContactController);
