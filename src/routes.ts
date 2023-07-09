import { PdfController } from "./controller/PdfController"
import { PecasController } from "./controller/PecasController"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
    {
        method: "get",
        route: "/pdf",
        controller: PdfController,
        action: "all"
    },

    //pecas
    {
        method: 'get',
        route: '/getpecas',
        controller: PecasController,
        action: 'all'
    }
]