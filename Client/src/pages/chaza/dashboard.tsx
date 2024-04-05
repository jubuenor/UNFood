import React, { useEffect, useState } from "react";
// Importar el componente DashboardMain
import DashboardMain from "../../components/Chaza/Dashboard/DasboardMain";
import { getToken } from "../api/token";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import SidebarChaza from "@/components/Chaza/SidebarChaza";

import styles from "@/styles/home.chaza.module.css";

import { getStats } from "../api/chaza";

const DashboardPage: React.FC = () => {
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
    data: stats,
    isLoadingError,
  } = useQuery({
    queryKey: ["getStats"],
    queryFn: () => (id !== "" ? getStats(id) : null),
    enabled: id !== "",
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;
  if (stats === null) return <div>Error</div>;
  if (stats?.data === undefined) return <div>Error</div>;

  return (
    <div className={`${styles.home_chaza} h-100`}>
      <SidebarChaza />
      <DashboardMain stats={stats.data} />
    </div>
  );
};

// Con Next.js, el export default de una página en la carpeta /pages
// hará que esa página esté disponible como una ruta en tu aplicación.
export default DashboardPage;
