import { Request } from "express";
import { TokenPayload } from "../security/token-payload";

export interface WebRequest extends Request{
    token:TokenPayload;
    permissions:string[];
}