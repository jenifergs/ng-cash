import { useState, Dispatch, SetStateAction } from "react";
import { getUsername } from "../services/HeaderService";
import { transferValue } from "../services/FormTransferService";

export interface FormTransferProps {
  setReloadHeader: Dispatch<SetStateAction<boolean>>;
  setReloadTable: Dispatch<SetStateAction<boolean>>;
}

export default function FormTransfer({
  setReloadHeader,
  setReloadTable,
}: FormTransferProps) {
  const user = getUsername();
  const [username] = useState<string>(user);
  const [userTransfer, setUserTransfer] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { status, data } = await transferValue(
      username,
      userTransfer,
      Number(value)
    );
    if (status === 200) {
      setReloadHeader(true);
      setReloadTable(true);
      alert("Transfer successfully");
    } else {
      alert("Error when performing transfer" + data.error);
    }
  };
  return (
    <div className="section-transfer">
      <div className="form-transfer">
        <h1>Transfer</h1>
        <input type="text" name="" id="" value={username} />
        <p>For</p>
        <input
          type="text"
          name=""
          id=""
          value={userTransfer}
          onChange={({ target: { value: forUsernameValue } }) =>
            setUserTransfer(forUsernameValue)
          }
        />
        <p>Value</p>
        <input
          type="number"
          name=""
          id=""
          value={value}
          onChange={({ target: { value: transferValue2 } }) =>
            setValue(transferValue2)
          }
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
