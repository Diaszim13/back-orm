import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Peca } from "../entity/Peca";


export class PecasController {
    
    private PecaRepository = AppDataSource.getRepository(Peca);
    async all(request: Request, response: Response, next: NextFunction) {
        const pecas = await AppDataSource.manager.find(Peca);

        if (pecas)
        {
            response.status(200).send(pecas);
        }
        else {
            response.status(200).send({message: "No pecas found"});
        }
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id, 0);
        if (id === 0)
        {
            response.status(404).send({message: "No pecas found	"});
            return;
        }
        
        const peca = await this.PecaRepository.findOne(
            {
                where : {id}
            }
        )
            
        response.status(200).send(peca);
    }

    async save(request: Request, response: Response, next: NextFunction)
    {
        const data = request.body;

        const peca = Object.assign(new Peca(), {
            data
        });

        if(!await this.PecaRepository.save(data))
        {
            response.status(200).send({message: "Não foi possivel cadastrar", body: {}});
            return;
        }

        response.status(200).send({message: "Cadastrado com sucesso", body: peca});
    }
}