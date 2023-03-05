import { useRouter } from "next/router";
import React from "react";
import UpdateCustomerDueForm from "../../../components/UpdateCustomerDueForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Due Update">
      <UpdateCustomerDueForm data={router.query} />
    </Layout>
  );
}
