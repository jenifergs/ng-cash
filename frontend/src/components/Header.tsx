import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getBalance, getUsername } from "../services/HeaderService";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  reloadHeader: boolean;
  setReloadHeader: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ reloadHeader, setReloadHeader }: HeaderProps) {
  const [username, setUsername] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const balanceUSer = async () => {
      try {
        const userBalance = await getBalance();
        setBalance(userBalance);
        setReloadHeader(false);
      } catch (error) {
        alert("Error: " + error);
      }
    };

    setUsername(getUsername());
    if (reloadHeader) {
      balanceUSer();
    }
  }, [reloadHeader, setReloadHeader]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    <header>
      <h3>Olá, {username} !</h3>
      <div className="container-header">
        <h3>Saldo: R$ {balance}</h3>
        <button id="logOut" onClick={handleClick}>
          Log out
        </button>
      </div>
    </header>
  );
}
