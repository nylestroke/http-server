import data from "../data/TodoData";
import ITodo from "../interfaces/ITodo";

export default class TodoService {
    async getTodos() {
        return new Promise((resolve, _) => resolve(data));
    }

    async getTodo(id: number) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo: ITodo) => todo.id === id);
            if (todo) {
                resolve(todo);
            } else {
                reject(`Todo with id ${id} not found `);
            }
        });
    }

    async createTodo(todo: ITodo[]) {
        return new Promise((resolve, _) => {
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };
            resolve(newTodo);
        });
    }

    async updateTodo(id: number) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo: ITodo) => todo.id === id);
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            todo!["completed"] = true;
            resolve(todo);
        });
    }

    async deleteTodo(id: number) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo: ITodo) => todo.id === id);
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            resolve(`Todo deleted successfully`);
        });
    }
}