import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/login";
import MyLibrary from "./pages/mylibrary";
import Search from "./pages/search";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/register"

const router = createBrowserRouter([
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/my-library",
    element: <MyLibrary />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
