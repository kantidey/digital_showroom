import React from "react";
import useSWR from "swr";
import ManageWithdraw from "../../../components/ManageWithdraw";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getWithdraw = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/withdraw/read`, getWithdraw);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Withdraw">
      <ManageWithdraw data={data} />
    </Layout>
  );
}
