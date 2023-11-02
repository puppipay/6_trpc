Base setup

- Initialising router
- Creating server calls
- Client side to call functions on server

Testing

- test hello
- test mutation, with not matching types
- test nonexistent server calls

###

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

import trpcinstance from "../trpc";

export const appRouter = trpcinstance.router({
sayHi: trpcinstance.procedure.query(() => {
return "hi";

    }),
    logtoServer: trpcinstance.procedure.input(v => {
        if (typeof v === "string") {
            return v;
        }
        throw new Error("invalid input: Expected string");
    }).mutation(req => {
        console.log(`client says ${req.input}`);
        return true;
    })

})

###

import React from 'react';

import { createTRPCProxyClient } from '@trpc/client';
import { appRouter } from "../../../server/api"

import { httpBatchLink } from '@trpc/client/links/httpBatchLink';

function Test() {
const client = createTRPCProxyClient<appRouter>({
links: [httpBatchLink({
url: 'http://localhost:3000/trpc'
})]
});

    const myfunc = async () => {
        let result = await client.sayHi.query();
        console.log(result);

        result = await client.logtoServer.mutate("message to server")
        console.log(result);

        //    result = await client.logtoServer.mutate(1)
        //    console.log(result);

        result = await client.log.mutate(1)
        console.log(result);
    }

    myfunc();

    return (
        <div>Test</div>
    )

}

export default Test

###

import { initTRPC } from "@trpc/server";

const trpcinstance = initTRPC.create();

export default trpcinstance;

###

{
"name": "server",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"start": "nodemon -r esm api.ts"
},
"author": "",
"license": "ISC",
"dependencies": {
"@trpc/server": "^10.43.0",
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"esm": "^3.2.25",
"express": "^4.18.2",
"nodemon": "^3.0.1",
"ts-node": "^10.9.1"
},
"devDependencies": {
"@types/cors": "^2.8.15",
"@types/express": "^4.17.20",
"@types/node": "^20.8.10",
"typescript": "^5.2.2"
}
}

###

{
"name": "vite-project",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview"
},
"dependencies": {
"@trpc/client": "^10.43.0",
"react": "^18.2.0",
"react-dom": "^18.2.0"
},
"devDependencies": {
"@types/react": "^18.2.15",
"@types/react-dom": "^18.2.7",
"@typescript-eslint/eslint-plugin": "^6.0.0",
"@typescript-eslint/parser": "^6.0.0",
"@vitejs/plugin-react-swc": "^3.3.2",
"eslint": "^8.45.0",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.3",
"typescript": "^5.0.2",
"vite": "^4.4.5"
}
}
