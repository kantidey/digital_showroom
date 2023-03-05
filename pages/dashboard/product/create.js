import React from "react";
import useSWR from "swr";
import CreateProductForm from "../../../components/CreateProductForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getProduct = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/product/category/read`, getProduct);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Add New Product">
      <CreateProductForm data={data} />
    </Layout>
  );
}
