import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { clientsRoutes } from "./routers/clients.routes";
import cors from "cors";
import { contactRoutes } from "./routers/contact.routes";
import { loginRoutes } from "./routers/login.routes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/clients", clientsRoutes);
app.use("/login", loginRoutes);
app.use("/contacts", contactRoutes);

app.use(handleErrors);

export default app;
