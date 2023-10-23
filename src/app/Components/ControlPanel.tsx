"use client";
import ActiveListPanel from "./ActiveListPanel";
import Masterlist from "./Masterlist";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbarStore } from "../Store/snackbar_store";
import { useMasterlistStore } from "../Store/masterlist_store";
import React from "react";
import { TCategory } from "../Types/Types";
import { Themes } from "../Types/Enums";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ControlPanel({
  masterList,
  theme,
}: {
  masterList: Array<TCategory>;
  theme: Themes;
}) {
  // update masterlist store
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );
  updateCategories(masterList);

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
      <Masterlist theme={theme} />
      <ActiveListPanel theme={theme} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackber}
      >
        <Alert
          onClose={handleCloseSnackber}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
