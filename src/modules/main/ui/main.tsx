import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "@/shared/components/header";

export function Main() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}