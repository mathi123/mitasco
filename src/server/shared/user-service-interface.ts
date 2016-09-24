import { SearchArgument } from "./search-argument";
import { PartialResultList } from "./partial-result-list";
import { User } from "./user";

export interface UserServiceInterface{
    search(argument: SearchArgument): Promise<PartialResultList<User>>;
    remove(id: number): Promise<boolean>;
    read(id: number): Promise<User>;
    update(user: User): Promise<boolean>;
}