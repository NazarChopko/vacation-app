import React, { useContext, useEffect, useState } from "react";
import { useNavigate, RouterProvider } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AppRouter from "./router/AppRouter";
import UserDataContext, { UserData } from "./context/UserDataContext";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user") as string);
    if (!isUser) {
      return navigate("/login");
    }
    if (isUser.remember) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <UserDataContext>
      <AppRouter />;
    </UserDataContext>
  );
}

export default App;
