import { Server } from "./server";

let server = new Server().app;

const port = process.env.PORT || 3000;

process.on('SIGINT', () => {
    console.log('Stopping server');
	process.exit();
});

process.on('uncaughtException', (err) => {
    console.log('===========[Uncaught Exception Occured. Pleas check!]================\n', err);
	process.exit();
})

server.listen(port, () => console.log(`Server is running at port ${port}`))