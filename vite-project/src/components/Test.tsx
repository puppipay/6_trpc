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