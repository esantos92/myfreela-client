import { useState } from "react";
import { LayoutComponents } from "../../Components/LayoutComponents"
import { Link } from "react-router-dom";

import logoMyFreela from "../../assets/logo.png"

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return(
    <LayoutComponents>
      <form className="login-form">
        <span className="login-form-title">Criar conta</span>

        <span className="login-form-title">
          <img src={logoMyFreela} alt="Logo MyFreela" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="name"
            required="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            required="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn">Registrar</button>
        </div>

        <div className="text-center">
          <span className="text-1">Já possui conta?</span>

          <Link className="text-2" to="/login">
            Acessar com email e senha.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  )
}