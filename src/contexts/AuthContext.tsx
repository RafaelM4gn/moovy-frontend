import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (token: string) => {},
});

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState("No token");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
