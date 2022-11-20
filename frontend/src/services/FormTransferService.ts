import { getToken } from "./TokenService";
import { contante } from "../constante/env";

export async function transferValue(
  fromUser: string,
  toUser: string,
  value: number
) {
  // ler o token para realizar a transação
  const token = await getToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const userData = JSON.stringify({
    cashOut: fromUser,
    cashIn: toUser,
    value: Number(value),
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: userData,
    redirect: "follow",
  };

  const response = await fetch(
    `${contante.host}/transfer`,
    requestOptions as RequestInit
  );
  const data = await response.json();
  return {
    data,
    status: response.status,
  };
}
