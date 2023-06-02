import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { AppDataSource } from "../data-source";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { returnClientSchema } from "../schemas/clients.schema";
import { Client } from "../entities";

export const listContactRoutes: Router = Router();
listContactRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  async (request: Request, response: Response) => {
    try {
      if (!request.client) {
        return response
          .status(401)
          .json({ message: "Unauthenticated client!" });
      }
      const clientId = request.client.id;
      const clientRepository = AppDataSource.getRepository(Client);
      const queryBuilder = clientRepository
        .createQueryBuilder("client")
        .leftJoinAndSelect("client.contact", "contact")
        .where("client.id = :clientId", { clientId });

      const client = await queryBuilder.getOne();
      if (!client) {
        return response.status(404).json({ message: "Client not found!" });
      }
      const doc = new PDFDocument();
      doc
        .fontSize(18)
        .fillColor("purple")
        .text("Customer Report", { align: "center", underline: true })
        .moveDown();
      const validateClient = returnClientSchema.parse(client);
      doc
        .fontSize(12)
        .fillColor("black")
        .text(
          `Name: ${validateClient.name},
          E-mail:${validateClient.email},
          Phone: ${validateClient.phone},
          Date: ${validateClient.registerDate},
          Gender:${validateClient.gender}`
        )
        .moveDown();
      doc.fontSize(14).text("Contacts:", { align: "left" }).moveDown();
      client.contact.forEach((contact) => {
        doc
          .fontSize(12)
          .fillColor("black")
          .text(
            `FullName: ${contact.fullName},
            E-mail: ${contact.email == null ? "not informed" : contact.email},
            Phone: ${contact.phone},
            Date: ${contact.registerDate},
            Gender: ${contact.gender}`
          );
      });
      doc.end();
      response.setHeader("Content-Type", "application/pdf");
      doc.pipe(response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao gerar o relatório." });
    }
  }
);
