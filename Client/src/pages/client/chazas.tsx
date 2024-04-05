import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import ListaChaza from "@/components/Chaza/ListaChaza";
import { getChazas } from "../api/chaza";
import Header from "@/components/Header";

function Home() {
  const {
    status,
    error,
    data: chazas,
  } = useQuery({
    queryKey: ["getChazas"],
    queryFn: () => getChazas(),
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (chazas === null || chazas === undefined) return <h1>Error</h1>;

  const data = [...chazas.data].reverse();

  return (
    <>
      <Header></Header>
      <ListaChaza chazas={data}></ListaChaza>
    </>
  );
}

export default Home;
