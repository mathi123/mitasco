import { Injectable } from '@angular/core'
import { Todo } from "../shared/Todo";
import { SearchArgument } from "../shared/SearchArgument";
import { PartialResultList } from "../shared/PartialResultList";

@Injectable()
export class TodoService{
    public SearchTodos(arg: SearchArgument) : PartialResultList<Todo>{
        let a = new Todo();
        a.description = "code";
        a.isDone = true;
        let b = new Todo();
        b.description = "test";
        let c = new Todo();
        c.description = "deploy";

        let result = new PartialResultList<Todo>();
        result.skipped = 0;
        result.count = 3;
        result.results = [a,b,c];
        return result;
    }
}