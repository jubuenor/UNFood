import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ChazaStore from "@/components/Client/ChazaStore";
import { Chaza } from "@/types/chaza";
import { Product } from "@/types/product";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getChazabyName } from "@/pages/api/chaza";
import Loading from "@/components/Loading";

function ChazaStoree() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (router.query.name) {
      setName(router.query.name as string);
    }
  }, [router.query.name]);

  const {
    status,
    error,
    data: chaza,
  } = useQuery({
    queryKey: ["getChazabyName"],
    queryFn: () => (name !== "" ? getChazabyName(name) : null),
    enabled: name !== "",
  });
  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;
  if (chaza === null) return <div>Error</div>;
  if (chaza === undefined) return <div>Error</div>;

  return (
    <>
      <Header></Header>
      <ChazaStore chaza={chaza.data}></ChazaStore>
    </>
  );
}

export default ChazaStoree;
