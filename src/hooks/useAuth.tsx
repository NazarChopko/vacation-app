import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  email: string;
  password: string;
  remember: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getUser: User | null = JSON.parse(
      localStorage.getItem("user") as string
    );
    if (getUser) {
      setUser(getUser);
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoading(false);
    navigate("/user", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
