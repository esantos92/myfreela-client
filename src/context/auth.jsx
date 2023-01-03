import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };

    loadingStorageData();
  }, []);

  const signIn = async ({ email, password }) => {
    api
      .post("/user/signin", {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data.user_id);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", response.data.user_id);
      })
      .catch((error) => alert("Email ou senha incorretos"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
