import React, { useState, useEffect } from "react";
import OrderDashboard from "@/components/Chaza/OrderDashboard";
import SidebarChaza from "@/components/Chaza/SidebarChaza";
import styles from "@/styles/chaza.orderdashboard.module.css";
import { getToken } from "../api/token";
import { useQuery } from "react-query";
import { getOrdersByChaza } from "../api/order";
import Loading from "@/components/Loading";

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
    queryKey: ["getOrdersByChaza"],
    queryFn: () => (id !== "" ? getOrdersByChaza(id) : null),
    enabled: id !== "",
  });
  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;
  if (orders === null || orders === undefined) return <div>Error</div>;

  const data = [...orders.data].reverse();

  return (
    <div className={`${styles.home_chaza} h-100 w-100`}>
      <SidebarChaza></SidebarChaza>
      <OrderDashboard orders={data}></OrderDashboard>
    </div>
  );
}

export default Orders;
