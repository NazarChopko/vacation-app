import React from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <div>Dashboard</div>
      </Layout>
    </>
  );
};

export default User;
