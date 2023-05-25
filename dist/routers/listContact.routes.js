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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContactRoutes = exports.reportRoutes = void 0;
const express_1 = require("express");
const pdfkit_1 = __importDefault(require("pdfkit"));
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const clients_schema_1 = require("../schemas/clients.schema");
exports.reportRoutes = (0, express_1.Router)();
exports.listContactRoutes = (0, express_1.Router)();
exports.listContactRoutes.get("", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
        const clients = yield clientRepository.find({
            relations: {
                contact: true,
            },
        });
        const doc = new pdfkit_1.default();
        doc
            .fontSize(18)
            .fillColor("purple")
            .text("Customer Report", { align: "center", underline: true })
            .moveDown();
        clients.forEach((client, index) => {
            const validateClient = clients_schema_1.returnClientSchema.parse(client);
            doc
                .fontSize(12)
                .fillColor("black")
                .text(`Client ${index + 1}: 
          Name: ${validateClient.name}, 
          E-mail:${validateClient.email}, 
          Phone: ${validateClient.phone}, 
          Date: ${validateClient.registerDate}, 
          Gender:${validateClient.gender}`);
            client.contact.forEach((contact) => {
                doc.fontSize(10).text(`   - Contact: 
            FullName: ${contact.fullName},
            E-mail: ${contact.email == null ? "not informed" : contact.email}, 
            Phone: ${contact.phone}, 
            Date: ${contact.registerDate}, 
            Gender: ${contact.gender}`);
            });
            doc.moveDown();
        });
        doc.end();
        response.setHeader("Content-Type", "application/pdf");
        doc.pipe(response);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ message: "Error generating contact list." });
    }
}));
