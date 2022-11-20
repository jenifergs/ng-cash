import { decodeToken, getToken } from "./TokenService";
import { contante } from "../constante/env";

export async function getBalance() {
  const token = getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${contante.host}/balance`, options);
  const data = await response.json();
  if (response.status === 200) {
    return data.balance;
  } else {
    throw new Error(data.error);
  }
}

export function getUsername() {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const username = decodeToken(token);
  return username.username;
}
