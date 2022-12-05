import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserForm from "../components/Form";
import User from "../components/User";
import { useAuth } from "../hooks/useAuth";

const AppRouter = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loading) return;
  //   if (!loading) {
  //     if (user && !user.remember) {
  //       navigate("/login", { replace: true });
  //     } else if (user && user.remember) {
  //       navigate("/user", { replace: true });
  //     }
  //   }
  // }, []);

  return user ? (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<UserForm />} />
      <Route path="*" element={<User />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<UserForm />} />
      <Route path="*" element={<UserForm />} />
    </Routes>
  );
};

export default AppRouter;
