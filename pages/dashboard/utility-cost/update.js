import { useRouter } from "next/router";
import React from "react";
import UpdateUtilityCostForm from "../../../components/UpdateUtilityCostForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Utility cost">
      <UpdateUtilityCostForm data={router.query} />
    </Layout>
  );
}
