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
    const isUser: User = JSON.parse(localStorage.getItem("user") as string);

    if (!isUser) {
      setLoading(false);
      return navigate("/", { replace: true });
    }

    if (isUser.remember) {
      navigate("/user", { replace: true });
    }
    setUser(isUser as User);
    setLoading(false);
  }, []);

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
  };

  return { user, login, logout, loading };
};
