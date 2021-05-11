import { Request } from "express";

export interface MyRequest extends Request {
    userInfo: any;
    username: any;
}