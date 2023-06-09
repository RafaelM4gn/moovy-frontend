import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string;
  setToken: (value: string) => void;
};

// iniciando o contexto com um objeto vazio
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(" ");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
