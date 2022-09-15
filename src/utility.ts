import * as dotenv from 'dotenv';

export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}

export function setup() {
  dotenv.config();
}