import { useState } from "react";
import { contante } from "../constante/env";
import { useNavigate } from "react-router-dom";
import iconlogin from "./iconlogin.svg";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const userData = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: userData,
      redirect: "follow",
    };

    const response = await fetch(
      `${contante.host}/login`,
      requestOptions as RequestInit
    );
    if (response.status === 200) {
      const data = await response.json(); // { token}
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert("username or password is incorrect");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="icon"> Sign In</h2>

        <label htmlFor="username">
          Usernames:
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <div className="buttons">
            <button onClick={handleSubmit}>
              {" "}
              <img src={iconlogin} alt="" />
              Sign In
            </button>
            <span>or</span>
            <button onClick={() => navigate("/register")}>New Account</button>
          </div>
        </label>
      </div>
    </div>
  );
}
