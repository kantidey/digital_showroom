import React from "react";
import useSWR from "swr";
import ManageUtilityCost from "../../../components/ManageUtilityCost";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getUtilityCost = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/utilityCost/read`, getUtilityCost);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Utility Cost">
      <ManageUtilityCost data={data} />
    </Layout>
  );
}
