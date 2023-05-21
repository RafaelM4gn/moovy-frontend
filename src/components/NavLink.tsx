import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function NavLink({
  to: to,
  children,
}: {
  to: string;
  children: string;
}) {
  const location = useLocation();
  const sx = {
    fontWeight: 700,
    fontSize: "16px",
    color: location.pathname === to ? "#F2911B" : "#000000",
    mr: 15,
  };
  return (
    <Link component={RouterLink} to={to} underline="none" sx={sx}>
      {" "}
      {children}{" "}
    </Link>
  );
}
