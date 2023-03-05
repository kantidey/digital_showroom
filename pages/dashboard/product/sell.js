import React from "react";
import useSWR from "swr";
import ProductSellingForm from "../../../components/ProductSellingForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getProductAndOtherCost = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(
    `/api/product/getProductAndOtherCost`,
    getProductAndOtherCost
  );
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Sell Product">
      <ProductSellingForm data={data} />
    </Layout>
  );
}
