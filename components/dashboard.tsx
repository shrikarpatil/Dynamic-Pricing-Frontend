"use client";
import { useLoading } from "@/hooks/context/LoadingContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const Dashboard = () => {
  const { setLoading: setModalLoading } = useLoading();
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return <div></div>;
};
export default Dashboard;