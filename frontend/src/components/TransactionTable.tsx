import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getTransactions } from "../services/TransactionTableService";
import { TransactionModel } from "../interfaces/Transaction";

export interface TransactionTableProps {
  reloadTable: boolean;
  setReloadTable: Dispatch<SetStateAction<boolean>>;
}

export default function TransactionTable({
  reloadTable,
  setReloadTable,
}: TransactionTableProps) {
  const [isCashIn, setIsCashIn] = useState<boolean | undefined>(undefined);
  const [isCashOut, setIsCashOut] = useState<boolean | undefined>(undefined);
  const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  useEffect(() => {
    const handleTransactions = async () => {
      if (reloadTable) {
        try {
          const response = await getTransactions(
            isCashIn,
            isCashOut,
            createdAt
          );
          setTransactions(response);
          setReloadTable(false);
        } catch (error) {
          alert("Error: " + error);
        }
      }
    };

    handleTransactions();
  }, [createdAt, isCashIn, isCashOut, reloadTable, setReloadTable]);

  const clearFilters = () => {
    setIsCashIn(undefined);
    setIsCashOut(undefined);
    setCreatedAt(undefined);
    setReloadTable(true);
  };

  const handleCashIn = () => {
    setIsCashIn(true);
    setIsCashOut(false);
    setReloadTable(true);
  };

  const handleCashOut = () => {
    setIsCashIn(false);
    setIsCashOut(true);
    setReloadTable(true);
  };

  return (
    <div className="table">
      <h1>Transactions</h1>
      <span>
        {"  "} Created At:{" "}
        <input
          type="date"
          onChange={(e) => {
            setCreatedAt(e.target.value);
            setReloadTable(true);
          }}
        />
        <button
          className={isCashIn ? "btn-true" : "btn"}
          onClick={handleCashIn}
        >
          Cash In
        </button>
        <button
          className={isCashOut ? "btn-true" : "btn"}
          onClick={handleCashOut}
        >
          Cash Out
        </button>
        <button id="clear" onClick={clearFilters}>
          All
        </button>
      </span>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Debited</th>
            <th>Credited</th>
            <th>Value</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.debitedAccountId}</td>
              <td>{transaction.creditedAccountId}</td>
              <td>{transaction.value}</td>
              <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
