"use client";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import Image from "next/image";
import reopen_icon from "@/../public/assets/reopen_icon.svg";
import copy_icon from "@/../public/assets/duplicate_icon.svg";
import archive_icon from "@/../public/assets/archive_icon.svg";
import { updateListArchiveStatus } from "@/app/Services/fetchWrapper";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef, useState } from "react";
import ConfirmationDialog from "@/app/Components/ConfirmationDialog";
import { Snackbar } from "@mui/material";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ListPanel({
  listId,
  isArchived,
  theme,
}: {
  listId: number;
  isArchived: boolean;
  theme: Themes;
}) {
  const themeClassName = getThemeClassName(theme);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("Success");

  const btnHdlArchiveList = async () => {
    setIsOpenDialog(true);
    setDialogTitle("Confirm Archiving of List");
    setDialogContent("Do you want to archive this list?");
  };

  const handleCloseYes = async () => {
    try {
      updateListArchiveStatus(listId, true);

      setIsOpenDialog(false);
      setSnackbarMessage("");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseNo = () => {
    setIsOpenDialog(false);
  };

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
    <div className={`${themeClassName} flex flex-row justify-between mt-8`}>
      {isArchived ? (
        <button
          className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
        >
          <Image src={reopen_icon} className={`w-8 mr-2`} alt="reopen icon" />
          Reopen this list
        </button>
      ) : (
        <button
          className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
          onClick={btnHdlArchiveList}
        >
          <Image src={archive_icon} className={`w-8 mr-2`} alt="archive icon" />
          Archive this list
        </button>
      )}
      <button
        className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                    hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
      >
        <Image src={copy_icon} className={`w-8 mr-2`} alt="copy icon" />
        Copy this List
      </button>{" "}
      <ConfirmationDialog
        isDialogOpen={isOpenDialog}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        hdlCloseNo={handleCloseNo}
        hdlCloseYes={handleCloseYes}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackber}
      >
        <Alert
          onClose={handleCloseSnackber}
          severity={severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
