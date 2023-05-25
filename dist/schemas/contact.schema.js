"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactSchema = exports.returnAllContactSchema = exports.returnContactWithClientSchema = exports.returnContactSchema = exports.contactSchema = void 0;
const zod_1 = require("zod");
const contact_entity_1 = require("../entities/contact.entity");
const clients_schema_1 = require("./clients.schema");
exports.contactSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(3).max(127),
    email: zod_1.z.string().email().max(127).optional().nullable(),
    phone: zod_1.z.string().max(45),
    gender: zod_1.z.nativeEnum(contact_entity_1.ContactGender),
});
exports.returnContactSchema = exports.contactSchema.extend({
    id: zod_1.z.number(),
    registerDate: zod_1.z.date().optional(),
});
exports.returnContactWithClientSchema = exports.returnContactSchema.extend({
    client: clients_schema_1.returnClientSchema,
});
exports.returnAllContactSchema = exports.returnContactSchema.array();
exports.updateContactSchema = exports.contactSchema.partial();
