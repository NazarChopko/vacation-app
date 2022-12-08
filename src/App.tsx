import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AppRouter from "./router/AppRouter";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user") as string);
    if (!isUser) {
      return navigate("/", { replace: true });
    }
    if (isUser.remember) {
      navigate("/user", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return <AppRouter />;
}

export default App;
