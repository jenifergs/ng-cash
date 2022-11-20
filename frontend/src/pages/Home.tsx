import { useState } from "react";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import FormTransfer from "../components/FormTransfer";

export default function Home() {
  const [reloadHeader, setReloadHeader] = useState<boolean>(true);
  const [reloadTable, setReloadTable] = useState<boolean>(true);

  return (
    <main>
      <Header reloadHeader={reloadHeader} setReloadHeader={setReloadHeader} />
      <div className="main">
        <FormTransfer
          setReloadHeader={setReloadHeader}
          setReloadTable={setReloadTable}
        />
        <TransactionTable
          reloadTable={reloadTable}
          setReloadTable={setReloadTable}
        />
      </div>
    </main>
  );
}
