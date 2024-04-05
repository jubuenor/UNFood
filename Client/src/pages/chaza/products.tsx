import React, { useEffect, useState } from "react";
import SidebarChaza from "@/components/Chaza/SidebarChaza";
import ProductsChaza from "@/components/Chaza/ProductsChaza";
import styles from "@/styles/products.chaza.module.css";
import { useQuery } from "react-query";
import { getToken } from "../api/token";
import { getChaza } from "../api/chaza";
import Loading from "@/components/Loading";

function Products() {
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
    data: chaza,
    isLoadingError,
  } = useQuery({
    queryKey: ["getChaza"],
    queryFn: () => (id !== "" ? getChaza(id) : null),
    enabled: id !== "",
  });
  
  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;
  if (chaza === null) return <div>Error</div>;
  if (chaza?.data === undefined) return <div>Error</div>;

  return (
    <div className={styles.home_chaza}>
      <SidebarChaza></SidebarChaza>
      <ProductsChaza chazaData={chaza.data}></ProductsChaza>
    </div>
  );
}

export default Products;
