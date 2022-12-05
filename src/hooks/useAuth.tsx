import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  email: string;
  password: string;
  remember: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(2);
    const isUser = localStorage.getItem("user");
    if (!isUser) return navigate("/login", { replace: true });
    navigate("/user", { replace: true });
    setUser(JSON.parse(isUser) as User);
    setLoading(false);
  }, [setUser]);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoading(false);
    navigate("/user", { replace: true });
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("user");
    setUser({} as User);
    setLoading(false);
    navigate("/login", { replace: true });
  };

  return { user, login, logout, loading };
};
