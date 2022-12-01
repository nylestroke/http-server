import * as https from "https";
import * as fs from "fs";
import TodoController from "./controllers/TodoController";

const PORT = process.env.PORT || 5000;

const options = {
    key: fs.readFileSync('./app/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('./app/fixtures/keys/agent2-cert.cert')
};

const server = https.createServer(options, async (req, res) => {
    await new TodoController().setEndpoints(req, res);
});

server.listen(PORT, () => {
    console.log(`Server started on: https://localhost:${PORT}`);
});