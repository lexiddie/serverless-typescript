import 'source-map-support/register';

import {
  createTodoHandler,
  deleteTodoHandler,
  getHealthHandler,
  getHelloHandler,
  getTestAsyncHandler,
  getTodoHandler,
  getTodosHandler,
  updateTodoHandler
} from './todo.controller';

export const getTodos = getTodosHandler;
export const getTodo = getTodoHandler;
export const createTodo = createTodoHandler;
export const updateTodo = updateTodoHandler;
export const deleteTodo = deleteTodoHandler;

export const getHealth = getHealthHandler;
export const getHello = getHelloHandler;
export const getTestAsync = getTestAsyncHandler;
