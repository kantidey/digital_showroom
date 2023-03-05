import { useRouter } from "next/router";
import React from "react";
import UpdateProductForm from "../../../components/UpdateProductForm";
import Layout from "../../../components/Layout";
import axios from "axios";
import useSWR from "swr";
import Loading from "../../../components/Loading";
const getProduct = (url) => axios.get(url).then((res) => res.data);
export default function UpdateProduct() {
  const { data } = useSWR(`/api/product/category/read`, getProduct);
  const router = useRouter();

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Update Product">
      <UpdateProductForm product={router.query} data={data} />
    </Layout>
  );
}
