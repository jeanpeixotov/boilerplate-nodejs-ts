/* tslint:disable */
import { IUserToken } from '../interfaces/userToken';

declare module "express" {
  interface Request {
    user: IUserToken;
  }
}