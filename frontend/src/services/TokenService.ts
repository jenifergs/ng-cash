// import {decode } from 'jsonwebtoken';
import jwt from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}
// https://stackoverflow.com/questions/53835816/decode-jwt-token-react
export interface User {
  username: string;
  id: number;
}

export function decodeToken(token: string) {
  return jwt(token) as User;
}
