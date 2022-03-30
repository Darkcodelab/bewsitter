import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Context
import Context from "../context/Context";

const Login = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let creds = {
      email,
      password,
    };

    let payload = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    fetch("http://localhost:5000/auth/login", payload)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Login Successful");
          dispatch({ type: "SET_USER", payload: { user: data.user } });
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="form loginform" onSubmit={handleFormSubmit}>
        <div className="formgroup">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            email={email}
            id="email"
            onChange={handleInput}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleInput}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
