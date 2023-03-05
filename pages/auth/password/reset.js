import React from "react";
import ResetPasswordForm from "../../../components/ResetPasswordForm";
import AuthLayout from "../../../components/AuthLayout";
export default function Index() {
  return (
    <AuthLayout pageTitle="Password Reset">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
