import React from "react";
import useSWR from "swr";
import ManageProductCategory from "../../../../components/ManageProductCategory";
import Loading from "../../../../components/Loading";
import Layout from "../../../../components/Layout";
import axios from "axios";
const getProductCategory = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/product/category/read`, getProductCategory);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Product Category">
      <ManageProductCategory data={data} />
    </Layout>
  );
}
