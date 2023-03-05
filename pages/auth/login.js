import React from "react";
import LoginForm from "../../components/LoginForm";
import AuthLayout from "../../components/AuthLayout";
export default function Index() {
  return (
    <AuthLayout pageTitle="User Login">
      <LoginForm />
    </AuthLayout>
  );
}
