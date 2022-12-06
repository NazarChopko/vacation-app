import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserForm from "../pages/Form";
import DashboardPage from "../pages/DashboardPage";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import AddVacationPage from "../pages/AddVacationPage";

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>loading</div>;

  return user ? (
    <Routes>
      <Route path="/user" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/user/vacation" element={<AddVacationPage />} />
      </Route>
      <Route path="/" element={<UserForm />} />
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="*" element={<UserForm />} />
    </Routes>
  );
};

export default AppRouter;
