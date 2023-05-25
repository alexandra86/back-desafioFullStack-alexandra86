"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSchema = exports.returnAllClientSchema = exports.returnClientSchema = exports.clientSchema = void 0;
const zod_1 = require("zod");
const clients_entity_1 = require("../entities/clients.entity");
exports.clientSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(127),
    email: zod_1.z.string().email().max(127),
    password: zod_1.z.string().max(120),
    phone: zod_1.z.string().max(45),
    image: zod_1.z.string().optional().nullable(),
    gender: zod_1.z.nativeEnum(clients_entity_1.ClientGender),
});
exports.returnClientSchema = exports.clientSchema
    .extend({
    id: zod_1.z.number(),
    registerDate: zod_1.z.date().optional(),
})
    .omit({ password: true });
exports.returnAllClientSchema = exports.returnClientSchema.array();
exports.updateClientSchema = exports.clientSchema.partial();
