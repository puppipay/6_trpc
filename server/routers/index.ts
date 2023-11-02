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

