"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const errors_1 = require("./errors");
const clients_routes_1 = require("./routers/clients.routes");
const cors_1 = __importDefault(require("cors"));
const contact_routes_1 = require("./routers/contact.routes");
const login_routes_1 = require("./routers/login.routes");
const listContact_routes_1 = require("./routers/listContact.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/clients", clients_routes_1.clientsRoutes);
app.use("/login", login_routes_1.loginRoutes);
app.use("/contacts", contact_routes_1.contactRoutes);
app.use("/listContacts", listContact_routes_1.listContactRoutes);
app.use(errors_1.handleErrors);
exports.default = app;