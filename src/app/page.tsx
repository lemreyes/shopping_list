"use client";

import Navbar from "./Components/Navbar";
import Masterlist from "./Components/Masterlist";
import ActiveListPanel from "./Components/ActiveListPanel";

import { useMasterlistStore } from "./Store/masterlist_store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { getMasterlist } from "./Services/fetchWrapper";

export default function Home() {
  // redirect to login if no session
  const { data: session } = useSession();
  if (session === null) {
    redirect("/Auth/Login");
  }

  // update masterlist store
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  // fetch masterlist data
  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await getMasterlist();
        updateCategories(responseData);
      } catch (error) {
        console.error("Fetch error", error);
      }
    }

    fetchData();
  });

  return (
    <div className="flex flex-col desktop:flex-row">
      <Navbar />
      <Masterlist />
      <ActiveListPanel />
    </div>
  );
}
