import React, { useState, useEffect } from "react";
import HomeChaza from "@/components/Chaza/HomeChaza";
import SidebarChaza from "@/components/Chaza/SidebarChaza";
import styles from "@/styles/home.chaza.module.css";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import Chazaregister from "@/components/Chaza/ChazaRegister";
import { getChaza } from "../api/chaza";
import { getToken } from "../api/token";

function Home() {
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

  if (chaza?.data === undefined) return <Chazaregister id={id}></Chazaregister>;
  return (
    <div className={`${styles.home_chaza} h-100`}>
      <SidebarChaza></SidebarChaza>
      <HomeChaza chazaData={chaza.data}></HomeChaza>
    </div>
  );
}

export default Home;
