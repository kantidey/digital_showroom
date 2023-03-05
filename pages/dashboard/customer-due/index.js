import React from "react";
import useSWR from "swr";
import ManageCustomerDue from "../../../components/ManageCustomerDue";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getCustomerDue = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/customerDue/read`, getCustomerDue);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Customer Due">
      <ManageCustomerDue data={data} />
    </Layout>
  );
}
