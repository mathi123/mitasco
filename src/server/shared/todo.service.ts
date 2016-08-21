import { Todo } from "./todo";
import { PartialResultList } from "./partial-result-list";
import { SearchArgument } from "./search-argument";

export interface TodoService{
    search(argument: SearchArgument): Promise<PartialResultList<Todo>>;
    create(todo: Todo): Promise<number>;
    remove(id: number): Promise<boolean>;
    read(id: number): Promise<Todo>;
    update(todo: Todo): Promise<boolean>
}