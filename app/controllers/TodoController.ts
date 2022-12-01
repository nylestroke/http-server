import getReqData from "../utils/_reqData";
import TodoService from "../services/TodoService";

export default class TodoController {
	public async setEndpoints(req: any, res: any) {
		// /api/todos : GET
		if (req.url === "/api/todos" && req.method === "GET") {
			const todos = await new TodoService().getTodos();
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(todos));
		}

		// /api/todos/:id : GET
		else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
			try {
				const id = req.url.split("/")[3];
				const todo = await new TodoService().getTodo(id);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(todo));
			} catch (error) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: error }));
			}
		}

		// /api/todos/:id : DELETE
		else if (
			req.url.match(/\/api\/todos\/([0-9]+)/) &&
			req.method === "DELETE"
		) {
			try {
				const id = req.url.split("/")[3];
				const message = await new TodoService().deleteTodo(id);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message }));
			} catch (error) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: error }));
			}
		}

		// /api/todos/:id : UPDATE
		else if (
			req.url.match(/\/api\/todos\/([0-9]+)/) &&
			req.method === "PATCH"
		) {
			try {
				const id = req.url.split("/")[3];
				const updated_todo = await new TodoService().updateTodo(id);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(updated_todo));
			} catch (error) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: error }));
			}
		}

		// /api/todos/ : POST
		else if (req.url === "/api/todos" && req.method === "POST") {
			const data = await getReqData(req);
			const todo = await new TodoService().createTodo(JSON.parse(<string>data));
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(todo));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Route not found" }));
		}
	}
}
