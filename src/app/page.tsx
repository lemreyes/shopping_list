"use client";
import * as React from "react";
import Navbar from "./Components/Navbar";
import Masterlist from "./Components/Masterlist";
import ActiveListPanel from "./Components/ActiveListPanel";

import { useMasterlistStore } from "./Store/masterlist_store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { getMasterlist } from "./Services/fetchWrapper";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbarStore } from "./Store/snackbar_store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  // get snackbar store
  const openSnackbar = useSnackbarStore((state: any) => state.openSnackbar);
  const snackbarMessage = useSnackbarStore((state: any) => state.message);
  const severity = useSnackbarStore((state: any) => state.severity);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );

  const handleCloseSnackber = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className="flex flex-col desktop:flex-row">
      <Navbar />
      <Masterlist />
      <ActiveListPanel />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackber}
      >
        <Alert onClose={handleCloseSnackber} severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
