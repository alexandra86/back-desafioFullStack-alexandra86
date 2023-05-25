import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { returnClientSchema } from "../schemas/clients.schema";
export const reportRoutes: Router = Router();

export const listContactRoutes = Router();
listContactRoutes.get("", async (request: Request, response: Response) => {
  try {
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find({
      relations: {
        contact: true,
      },
    });
    const doc = new PDFDocument();
    doc
      .fontSize(18)
      .fillColor("purple")
      .text("Customer Report", { align: "center", underline: true })
      .moveDown();
    clients.forEach((client, index) => {
      const validateClient = returnClientSchema.parse(client);
      doc
        .fontSize(12)
        .fillColor("black")
        .text(
          `Client ${index + 1}: 
          Name: ${validateClient.name}, 
          E-mail:${validateClient.email}, 
          Phone: ${validateClient.phone}, 
          Date: ${validateClient.registerDate}, 
          Gender:${validateClient.gender}`
        );

      client.contact.forEach((contact) => {
        doc.fontSize(10).text(
          `   - Contact: 
            FullName: ${contact.fullName},
            E-mail: ${contact.email == null ? "not informed" : contact.email}, 
            Phone: ${contact.phone}, 
            Date: ${contact.registerDate}, 
            Gender: ${contact.gender}`
        );
      });
      doc.moveDown();
    });
    doc.end();
    response.setHeader("Content-Type", "application/pdf");
    doc.pipe(response);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error generating contact list." });
  }
});
