const Joi = require("joi");
const connection = require("../database/connection");
const response = require("../models/custom_response")

const validateTodo = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return response.unableToProcess(res, error.details, 'Invalid Request', 200);
    next();
}

const createTodo = (req, res) => {
    let name = req.body.name;
    let description = req.body.description
    let now = new Date()
    connection.query("INSERT INTO todos(name, description,created_at, updated_at) values(?,?,?,?)", [name, description, now, now], (error, result) => {
        if (error) return response.unableToProcess(res, error);
        if (result) return response.success(res, { id: result.insertId, ...req.body, created_at: now }, 'Created')
        return response.unableToProcess(res);
    });
}

const getTodos = (req, res) => {
    connection.query("SELECT * FROM todos ORDER BY created_at", (error, result) => {
        if (error) return response.notFound();
        return response.success(res, result);
    });
}


const getTodoByID = (req, res) => {
    const sql = "SELECT * FROM todos WHERE id = ?";
    const id = req.params.id;

    connection.query(sql, [id], (error, result) => {
        if (error) return response.unableToProcess(res);
        const proudct = result[0];
        if (proudct) return response.success(res, proudct)
        return response.notFound(res);
    });
}

const updateTodo = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let now = new Date()
    connection.query("UPDATE todos SET name=?, description=?, updated_at=? WHERE id = ?", [name, description, now, id], (error, result) => {
        if (error) return response.unableToProcess(res, error);
        if (result) return response.success(res, { id, name, description, updated_at: now }, 'Updated', 201)
        return response.unableToProcess(res);
    });
}

const deleteTodo = (req, res) => {
    let id = req.params.id
    connection.query("DELETE FROM todos WHERE id = ?", id, (error, result) => {
        if (error) return response.unableToProcess(res)
        if (result.affectedRows) return response.deleted(res)
        return response.notFound(res)

    })
}

module.exports = {
    createTodo, getTodos, deleteTodo, updateTodo, getTodoByID, validateTodo
}