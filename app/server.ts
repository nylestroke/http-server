import * as http from "http";
import * as fs from "fs";
import TodoController from "./controllers/TodoController";

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    await new TodoController().setEndpoints(req, res);
});

server.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
});
