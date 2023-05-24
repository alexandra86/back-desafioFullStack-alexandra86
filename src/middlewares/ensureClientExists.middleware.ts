import { Request, Response, NextFunction } from "express";
import { iClientRepo } from "../interfaces/clients.interface";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors";

export const ensureClientExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const clientRepository: iClientRepo = AppDataSource.getRepository(Client);

  const clientFind = await clientRepository.findOne({
    where: {
      id: parseInt(request.params.id) || parseInt(request.client.id),
    },
  });

  if (!clientFind) {
    throw new AppError("Client not found!", 404);
  }
  return next();
};
