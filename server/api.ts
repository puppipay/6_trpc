import express from "express";
import cors from "cors";
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
// https://trpc.io/docs/quickstart


import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";



const app = express()
const port = 3000

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export type appRouter = typeof appRouter;