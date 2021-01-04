const { Router } = require("express");
const todoController = require("../../../controllers/todo_controller")
const route = Router();

route.get("/todos", todoController.getTodos);
route.post("/todos", todoController.validateTodo, todoController.createTodo);
route.get("/todos/:id", todoController.getTodoByID);
route.put("/todos/:id", todoController.validateTodo, todoController.updateTodo);
route.delete("/todos/:id", todoController.deleteTodo);

module.exports = route;