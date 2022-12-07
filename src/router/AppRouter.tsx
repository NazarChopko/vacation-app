import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { UserForm } from "../pages/Form";
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "../shared/Layout";
import { useAuth } from "../hooks/useAuth";
import { AddVacation } from "../pages/AddVacation";

const AppRouter = () => {
  const { user, loading } = useAuth();
  const [isBackButton, setIsBackButton] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Dashboard");

  if (loading) return <div>loading</div>;

  return user ? (
    <Routes>
      <Route
        path="/user"
        element={
          <Layout
            title={title}
            isBackButton={isBackButton}
            setIsBackButton={setIsBackButton}
            setTitle={setTitle}
          />
        }
      >
        <Route
          index
          element={
            <Dashboard setIsBackButton={setIsBackButton} setTitle={setTitle} />
          }
        />
        <Route path="/user/vacation" element={<AddVacation />} />
      </Route>
      <Route path="/" element={<UserForm />} />
      <Route path="*" element={<Navigate to="user" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="*" element={<UserForm />} />
    </Routes>
  );
};

export default AppRouter;
