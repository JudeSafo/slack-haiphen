import axios from 'axios';
import * as dotenv from 'dotenv';

export interface OAuth {
  clientId: string;
  secretId: string;
  redirectUri?: string;
}

export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}

export function setup() {
  dotenv.config();
}

export const getOauthAccessToken = async (code: string, param: OAuth, tokenUri: string) => {
  const response = await axios.post<{access_token: string; scope: string}>(tokenUri,
    {
      code,
      client_id: param.clientId,
      client_secret: param.secretId,
      redirect_uri: param.redirectUri,
    },
  );
  return response;
};