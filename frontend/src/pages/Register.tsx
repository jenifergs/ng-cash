import { useState } from "react";
import { contante } from "../constante/env";
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");

const navigate = useNavigate();

const handleSubmit = async (e: any) => {
  e.preventDefault();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const userData = JSON.stringify({
      username: username,
      password: password
  });

  const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: userData,
      redirect: 'follow'
  };

  const response = await fetch(`${contante.host}/user`, requestOptions as RequestInit)
  const data = await response.json() // { token}

  if(response.status === 200) {
    localStorage.setItem('token', data.token)
    navigate('/home')
  } else {
    alert(`Error: ${data.error}`)
  }
  
}

const handleClick = () => {
  navigate('/login')
};
  return (
    <div className="login">
      <div className="login__container">
        <h2>New Account</h2>
        <label htmlFor="username">Username:
        <br />
        <input type="text" name="" id="username" onChange={({target: {value}}) => setUsername(value)} />
        </label>

        <label htmlFor="password">Password:
        <br />
        <input type="password" name="" id="password" onChange={({target: {value}}) => setPassword(value)} />
        </label>
        <div className="buttons">
        <button onClick={handleSubmit}>Create</button>
        <span>or</span>
        <button onClick={ handleClick }>Sign In</button>  

        </div>

        </div>
    </div>
  );
}