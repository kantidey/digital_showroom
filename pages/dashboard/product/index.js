import React from "react";
import useSWR from "swr";
import ManageProduct from "../../../components/ManageProduct";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getProduct = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/product/read`, getProduct);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Product">
      <ManageProduct data={data} />
    </Layout>
  );
}
