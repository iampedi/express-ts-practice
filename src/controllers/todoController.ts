// src/controllers/todoController.ts

import { Request, Response } from "express";
import { Todo } from "../types/todo";

let todos: Todo[] = [
  { id: 1, title: "Learn Express with TypeScript", completed: false },
  { id: 2, title: "Build a TODO api", completed: false },
];

// Get Todos
export const getTodos = (req: Request, res: Response) => {
  res.status(200).json(todos);
};

// Create Todo
export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    res
      .status(400)
      .json({ message: "Title is required and must be a string." });
    return;
  }

  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

// Edit Todo
export const updateTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  if (typeof title !== "string" || typeof completed !== "boolean") {
    res.status(400).json({
      message: "Both title (string) and completed (boolean) are required.",
    });
    return;
  }

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found." });
    return;
  }

  todo.title = title;
  todo.completed = completed;

  res.status(200).json(todo);
};

// Delete Todo
export const deleteTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Todo not found." });
    return;
  }

  const deleted = todos.splice(index, 1)[0];
  res.status(200).json({ message: "Todo deleted.", todo: deleted });
};
