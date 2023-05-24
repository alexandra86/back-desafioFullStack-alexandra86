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
import { ensureContactPermissionMiddleware } from "../middlewares/ensureContactPermission.middleware";
import { ensureContactExistsMiddleware } from "../middlewares/ensureContactExists.middleware";

export const contactRoutes = Router();

contactRoutes.use(ensureTokenIsValidMiddleware);

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  createContactController
);
contactRoutes.get("", listContactsController);

contactRoutes.get(
  "/:id",
  ensureContactPermissionMiddleware,
  retrieveContactController
);

contactRoutes.patch(
  "/:id",
  ensureContactExistsMiddleware,
  ensureContactPermissionMiddleware,
  ensureDataIsValidMiddleware(updateClontactSchema),
  updateContactController
);
contactRoutes.delete(
  "/:id",
  ensureContactExistsMiddleware,
  ensureContactPermissionMiddleware,
  deleteContactController
);
