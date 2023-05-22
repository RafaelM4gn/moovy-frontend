import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateToken } from "../api/api";
import { Navigate } from "react-router-dom";

export default function PrivatePage({ children }: { children: JSX.Element }) {
  const [validToken, setValidToken] = useState<boolean | null>(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const validate = async () => {
      try {
        await validateToken(token);
        setValidToken(true);
      } catch (error) {
        setValidToken(false);
      }
    };
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (validToken === null) {
    return <p>Loading...</p>;
  } else {
    return validToken ? children : <Navigate to="/" />;
  }
}
