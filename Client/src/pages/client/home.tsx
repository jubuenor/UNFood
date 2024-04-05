import React, { useState } from "react";
import Header from "@/components/Header";
import Home from "@/components/Client/Home";
import { getNumbers } from "../api/chaza";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";

function Homee() {
  const {
    status,
    error,
    data: numbers,
  } = useQuery({
    queryKey: ["getNumbers"],
    queryFn: () => getNumbers(),
  });
  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (numbers === null || numbers === undefined) return <h1>Error</h1>;

  return (
    <>
      <Header></Header>
      <Home numbers={numbers.data}></Home>
    </>
  );
}

export default Homee;
