"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactController = exports.updateContactController = exports.retrieveContactController = exports.listContactsController = exports.createContactController = void 0;
const createContact_service_1 = require("../services/contact/createContact.service");
const listContact_service_1 = require("../services/contact/listContact.service");
const retrieveContact_service_1 = require("../services/contact/retrieveContact.service");
const updateContact_service_1 = require("../services/contact/updateContact.service");
const deleteContact_service_1 = require("../services/contact/deleteContact.service");
const createContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = request.body;
    const clientId = parseInt(request.client.id);
    const newContact = yield (0, createContact_service_1.createContactService)(contactData, clientId);
    return response.status(201).json(newContact);
});
exports.createContactController = createContactController;
const listContactsController = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield (0, listContact_service_1.listContactService)();
    return response.json(contact);
});
exports.listContactsController = listContactsController;
const retrieveContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const contact = yield (0, retrieveContact_service_1.retrieveContactService)(id);
    return response.json(contact);
});
exports.retrieveContactController = retrieveContactController;
const updateContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = request.body;
    const id = parseInt(request.params.id);
    const updateContact = yield (0, updateContact_service_1.updateContactService)(contactData, id);
    return response.json(updateContact);
});
exports.updateContactController = updateContactController;
const deleteContactController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    yield (0, deleteContact_service_1.deleteContactService)(id);
    return response.status(204).send();
});
exports.deleteContactController = deleteContactController;
