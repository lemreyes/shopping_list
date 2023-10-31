"use client";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import Image from "next/image";
import reopen_icon from "@/../public/assets/reopen_icon.svg";
import copy_icon from "@/../public/assets/duplicate_icon.svg";
import archive_icon from "@/../public/assets/archive_icon.svg";
import { updateListArchiveStatus } from "@/app/Services/fetchWrapper";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef, useEffect, useState } from "react";
import ConfirmationDialog from "@/app/Components/ConfirmationDialog";
import { Snackbar } from "@mui/material";
import NewObjectDialog from "@/app/Components/NewObjectDialog";

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
  const [dialogConfirmationText, setDialogConfirmationText] = useState("");
  const [dialogCopyListName, setDialogCopyListName] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("Success");
  const [isSnackbarClosed, setIsSnackbarClosed] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (isSnackbarClosed === true) {
      window.location.reload();
    }
  });

  const handleCloseYesArchive = async () => {
    try {
      await updateListArchiveStatus(listId, true);

      setIsOpenDialog(false);
      setSnackbarMessage("The list was archived.");
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

  const handleCloseYesReopen = async () => {
    try {
      await updateListArchiveStatus(listId, false);

      setIsOpenDialog(false);
      setSnackbarMessage("The list was reopened.");
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

  const handleCloseYesCopyList = async () => {
    try {
      // TO DO: call wrapper for duplicate list

      setIsOpenDialog(false);
      setSnackbarMessage("The list was successfully copied.");
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

  const handleCopyDialogOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDialogCopyListName(event.target.value);
  };

  const btnHdlArchiveList = async () => {
    setDialogTitle("Confirm Archiving of List");
    setDialogContent("Do you want to archive this list?");
    setIsOpenDialog(true);
  };

  const btnHdlReopenList = async () => {
    setDialogTitle("Confirm Reopening of List");
    setDialogContent("Do you want to reopen this list?");
    setIsOpenDialog(true);
  };

  const btnHdlCopyList = async () => {
    setDialogTitle("Copy Current List to New List");
    setDialogContent("Enter new name of copy list");
    setDialogConfirmationText("Copy");
    setIsOpenDialog(true);
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
    setIsSnackbarClosed(true);
  };

  return (
    <div className={`${themeClassName} flex flex-row justify-between mt-8`}>
      {isArchived ? (
        <>
          <button
            className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
            onClick={btnHdlReopenList}
          >
            <Image src={reopen_icon} className={`w-8 mr-2`} alt="reopen icon" />
            Reopen this list
          </button>
          <ConfirmationDialog
            isDialogOpen={isOpenDialog}
            dialogTitle={dialogTitle}
            dialogContent={dialogContent}
            hdlCloseNo={handleCloseNo}
            hdlCloseYes={handleCloseYesReopen}
          />
        </>
      ) : (
        <>
          <button
            className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
            onClick={btnHdlArchiveList}
          >
            <Image
              src={archive_icon}
              className={`w-8 mr-2`}
              alt="archive icon"
            />
            Archive this list
          </button>
          <ConfirmationDialog
            isDialogOpen={isOpenDialog}
            dialogTitle={dialogTitle}
            dialogContent={dialogContent}
            hdlCloseNo={handleCloseNo}
            hdlCloseYes={handleCloseYesArchive}
          />
        </>
      )}
      <button
        className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                    hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
        onClick={btnHdlCopyList}
      >
        <Image src={copy_icon} className={`w-8 mr-2`} alt="copy icon" />
        Copy this List
      </button>{" "}
      <NewObjectDialog
        isNewObjectDialogOpen={isOpenDialog}
        dialogTitle={dialogTitle}
        dialogContentText={dialogContent}
        confirmationText={dialogConfirmationText}
        hdlCloseNo={handleCloseNo}
        hdlCloseYes={handleCloseYesCopyList}
        hdlOnChange={handleCopyDialogOnChange}
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
