import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import OrdersComponent from "@/components/Client/Orders";
import { useQuery } from "react-query";
import { getOrdersByUser } from "../api/order";
import Loading from "@/components/Loading";
import { getToken } from "../api/token";

function Orders() {
  const [id, setId] = useState<string>("");

  const token = getToken()?.id;

  useEffect(() => {
    if (token) {
      setId(token);
    }
  }, [token]);

  const {
    status,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["getOrdersByUser"],
    queryFn: () => getOrdersByUser(id),
    enabled: id !== "",
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (orders === null || orders === undefined) return <h1>Error</h1>;

  const data = [...orders.data].reverse();

  return (
    <>
      <Header></Header>
      <OrdersComponent orders={data}></OrdersComponent>
    </>
  );
}

export default Orders;
