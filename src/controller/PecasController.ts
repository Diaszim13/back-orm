import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Peca } from "../entity/Peca";


export class PecasController {
    async all(request: Request, response: Response, next: NextFunction) {
        const pecas = await AppDataSource.manager.find(Peca);

        if (pecas)
        {
            response.status(200).send(pecas);
        } else {
            response.status(200).send({message: "No pecas found"});
        }
    }
}