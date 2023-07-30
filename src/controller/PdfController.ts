import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Photo } from "../entity/Photo";

export class PdfController {

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await AppDataSource.manager.find(User);
        const doc = new PDFDocument();

        doc.fontSize(15)
        .text("Id", 50, 50)
        .text("Nome", 150, 50)
        .text("idade", 150, 50);

        let y = 90;
        users.forEach(user => {
            doc.fontSize(15).
            text(user.id.toString(), 50, y).
            text(user.firstName, 150, y).
            text(user.age.toString(), 150, y)
            y+=20;
        })

        const filePath = await path.join(__dirname, "output.pdf");
        const writeStream = fs.createWriteStream(filePath);
        
        doc.pipe(writeStream);
        doc.end();

        writeStream.on("close", () => {
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", "attachment: filename=output.pdf");
            response.sendFile(filePath, () => {
                fs.unlinkSync(filePath);
            });
        })
    }

    /***
     * Input request: filtro
     */
    async pdf(request: Request, response: Response, next: NextFunction)
    {
        const photos = await AppDataSource.manager.find(Photo);
        const doc = new PDFDocument();
        doc.fontSize(20)
        .text("id", 50, 20)
        .text("Name", 150, 50)
        .text("Precisao", 150 , 70)

        let y = 20;
        photos.forEach(photo => {
            doc.fontSize(15).
            text(photo.id.toString(), 50, y).
            text(photo.name.toString(), 150, y).
            text(photo.precisao.toString(), 150, y).
            y+=30;
        });

        const filePath = await path.join(__dirname, "photos.0pdf");
        const writeStream = fs.createWriteStream(filePath);
        
        doc.pipe(writeStream);
        doc.end();

        writeStream.on("close", () => {
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", "attachment: filename=output.pdf");
            response.sendFile(filePath, () => {
                fs.unlinkSync(filePath);
            });
        })
    }
}