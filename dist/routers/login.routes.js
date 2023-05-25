"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const ensureDataIsValid_middeware_1 = require("../middlewares/ensureDataIsValid.middeware");
const login_schema_1 = require("../schemas/login.schema");
const login_controllers_1 = require("../controllers/login.controllers");
exports.loginRoutes = (0, express_1.Router)();
exports.loginRoutes.post("", (0, ensureDataIsValid_middeware_1.ensureDataIsValidMiddleware)(login_schema_1.createLoginSchema), login_controllers_1.createLoginController);
