import { getToken } from "./TokenService";
import { contante } from "../constante/env";
import { TransactionModel } from "../interfaces/Transaction";

function normalizeQuery(
  cashIn?: boolean,
  cashOut?: boolean,
  createdAt?: string
) {
  let query = "";

  if (cashIn || cashOut || createdAt) {
    query += "/query/?";
    if (cashIn) {
      query += `cashIn=${cashIn}&`;
    }
    if (cashOut) {
      query += `cashOut=${cashOut}&`;
    }
    if (createdAt) {
      query += `createdAt=${createdAt}&`;
    }
  }

  if (query.endsWith("&")) {
    query = query.slice(0, -1);
  }

  return query;
}

export async function getTransactions(
  cashIn?: boolean,
  cashOut?: boolean,
  createdAt?: string
) {
  const token = getToken();

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  const requestUrl =
    `${contante.host}/transactions` +
    normalizeQuery(cashIn, cashOut, createdAt);

  const response = await fetch(requestUrl, requestOptions as RequestInit);
  const result = await response.json();

  if (response.status === 200) {
    const transactions: TransactionModel[] = result.transactions;
    // ordernar pelo id
    return transactions.sort((a, b) => a.id - b.id);
  }
  throw new Error(result.error);
}
