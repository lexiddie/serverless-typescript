import { OkPacket } from 'mysql2';
import { ITodo } from '../entities/todo.entity';
import { ITodo as ITodoDto } from '../dto/todo.dto';
import { ITodoRepository } from '../repositories/todo.repository';

class DatabaseService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  createTodo = async (name: string): Promise<OkPacket> => {
    return this.todoRepository.createTodo(name);
  };

  getTodos = async (): Promise<ITodo[]> => {
    return this.todoRepository.getTodos();
  };

  getTodo = async (id: number): Promise<ITodo | null> => {
    return this.todoRepository.getTodo(id);
  };

  updateTodo = async (id: number, data: ITodoDto): Promise<ITodo | null> => {
    return this.todoRepository.updateTodo(id, data);
  };

  deleteTodo = async (id: number): Promise<boolean> => {
    return this.todoRepository.deleteTodo(id);
  };
}

export default DatabaseService;
