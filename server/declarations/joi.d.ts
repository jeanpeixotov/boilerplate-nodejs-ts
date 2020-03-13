import 'joi';
import { ValidationErrorItem } from 'joi';

/* tslint:disable */
declare module "joi" {
  // @ts-ignore
  export interface ValidationErrorItemString extends ValidationErrorItem {
    path: string;
  }

  export interface CustomValidationError {
    validationError: boolean;
    message: ValidationErrorItemString[];
  }
}