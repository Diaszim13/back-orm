// import * as express from "express"
const express = require("express");
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"

import PDFDocument from "pdfkit";
import { Peca } from "./entity/Peca";
import { Photo } from "./entity/Photo";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // await AppDataSource.manager.save(Photo, {
    //     size: 3000,
    //     name: 'Photo'
    // })

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(Peca, {
            

    //     })
    // )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
