import { OkPacket } from 'mysql2';
import { ITodo } from '../entities/todo.entity';
import { ITodo as ITodoDto } from '../dto/todo.dto';

export interface ITodoRepository {
  createTodo(name: string): Promise<OkPacket>;

  getTodos(): Promise<ITodo[]>;

  getTodo(id: number): Promise<ITodo | null>;

  updateTodo(id: number, data: ITodoDto): Promise<ITodo | null>;

  deleteTodo(id: number): Promise<boolean>;
}
