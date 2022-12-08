import { Routes, Route, Navigate } from "react-router-dom";
import { UserForm } from "../pages/UserForm";
import { Dashboard } from "../pages/Dashboard";
import { AddVacation } from "../pages/AddVacation";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/user" element={<Dashboard />} />
      <Route path="/user/vacation" element={<AddVacation />} />
      <Route path="/" element={<UserForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
