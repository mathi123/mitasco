import { Todo } from "./Todo";
import { PartialResultList } from "./PartialResultList";
import { SearchArgument } from "./SearchArgument";

export interface ITodoService{
    search(argument: SearchArgument): Promise<PartialResultList<Todo>>;
    create(todo: Todo): Promise<number>;
    remove(id: number): Promise<boolean>;
    read(id: number): Promise<Todo>;
    update(todo: Todo): Promise<boolean>
}