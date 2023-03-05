import React from "react";
import useSWR from "swr";
import Dashboard from "../../components/Dashboard";
import DashboardLoader from "../../components/DashboardLoader";
import Layout from "../../components/Layout";
import axios from "axios";
const getDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(
    `/api/getDashboardInfo`,
    getDashboardInfo
  );

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <DashboardLoader />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Welcome to admin dashboard">
      <Dashboard data={data} />
    </Layout>
  );
}
