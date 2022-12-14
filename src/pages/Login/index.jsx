import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LayoutComponents } from "../../Components/LayoutComponents";
import { AuthContext } from "../../context/auth";

import logoMyFreela from "../../assets/logo.png";
import "../../assets/global.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signed } = useContext(AuthContext);

  const handleSingIn = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  };

  if (signed) {
    return <Navigate to="/"/>
  } else {
    return (
      <LayoutComponents>
        <form onSubmit={handleSingIn} className="login-form">
          <span className="login-form-title">Bem vindo!</span>

          <span className="login-form-title">
            <img src={logoMyFreela} alt="Logo MyFreela" />
          </span>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={password !== "" ? "has-val input" : "input"}
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Senha"></span>
          </div>

          <div className="container-login-form-btn">
            <button type="submit" className="login-form-btn">Login</button>
          </div>

          <div className="text-center">
            <span className="text-1">Não possui conta?</span>

            <Link className="text-2" to="/register">
              Criar conta.
            </Link>
          </div>
        </form>
      </LayoutComponents>
    );
  }
};
