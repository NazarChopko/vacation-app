import { Routes, Route, Navigate } from "react-router-dom";
import { UserForm } from "../pages/UserForm";
import { Dashboard } from "../pages/Dashboard";
import { AddVacation } from "../pages/AddVacation";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vacation" element={<AddVacation />} />
      <Route path="/login" element={<UserForm />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
