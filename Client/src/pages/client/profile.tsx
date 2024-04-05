import React, { useState, useEffect } from "react";
import Profile from "@/components/Client/Profile";
import { getUser } from "../api/user";
import Loading from "@/components/Loading";
import { getToken } from "../api/token";
import { useQuery } from "react-query";
import Header from "@/components/Header";

function Profilee() {
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
    data: user,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(id),
    enabled: id !== "",
  });

  if (status === "loading") return <Loading></Loading>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  if (user === null || user === undefined) return <h1>Error</h1>;

  return (
    <>
      <Header></Header>
      <Profile userData={user.data}></Profile>
    </>
  );
}

export default Profilee;
