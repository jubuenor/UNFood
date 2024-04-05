import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Products from "@/components/Client/Products";
import { useQuery } from "react-query";
import { getProducts } from "../api/product";
import Loading from "@/components/Loading";

function Productss() {
  const [search, setSearch] = useState("");

  const {
    status,
    error,
    data: products,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => getProducts(),
  });
  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (products === null || products === undefined) return <h1>Error</h1>;

  const data = [...products.data].reverse();

  return (
    <>
      <Header setSearch={setSearch}></Header>
      <Products products={data} search={search}></Products>
    </>
  );
}

export default Productss;
