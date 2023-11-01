"use client";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import Image from "next/image";
import reopen_icon from "@/../public/assets/reopen_icon.svg";
import copy_icon from "@/../public/assets/duplicate_icon.svg";
import archive_icon from "@/../public/assets/archive_icon.svg";
import { copyList, updateListArchiveStatus } from "@/app/Services/fetchWrapper";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import ConfirmationDialog from "@/app/Components/ConfirmationDialog";
import NewObjectDialog from "@/app/Components/NewObjectDialog";
import ListCopyResult from "./ListCopyResult";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ListPanel({
  userId,
  listId,
  isArchived,
  theme,
}: {
  userId: number;
  listId: number;
  isArchived: boolean;
  theme: Themes;
}) {
  const themeClassName = getThemeClassName(theme);
  const [isOpenArchiveReopenDialog, setIsOpenArchiveReopenDialog] =
    useState(false);
  const [dialogTitleArchiveReopen, setDialogTitleArchiveReopen] = useState("");
  const [dialogContentArchiveReopen, setDialogContentArchiveReopen] =
    useState("");

  const [isOpenCopyDialog, setIsOpenCopyDialog] = useState(false);
  const [dialogCopyTitle, setDialogCopyTitle] = useState("");
  const [dialogCopyContent, setDialogCopyContent] = useState("");
  const [dialogCopyConfirmationText, setDialogCopyConfirmationText] =
    useState("");
  const [dialogCopyListName, setDialogCopyListName] = useState("");

  const [isShowCopyResult, setIsShowCopyResult] = useState(false);
  const [duplicateListName, setDuplicateListName] = useState("");
  const [duplicateListId, setDuplicateListId] = useState(0);
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
  }, [isSnackbarClosed]);

  const handleCloseYesArchive = async () => {
    try {
      await updateListArchiveStatus(listId, true);

      setIsOpenArchiveReopenDialog(false);
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

      setIsOpenArchiveReopenDialog(false);
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
      const copyResult = await copyList(listId, dialogCopyListName);
      console.log("copyResult", copyResult);

      setIsOpenCopyDialog(false);
      setSnackbarMessage("The list was successfully copied.");
      setSeverity("success");
      setOpenSnackbar(true);
      setDuplicateListId(copyResult.id);
      setDuplicateListName(copyResult.list_name);
      setIsShowCopyResult(true);
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
    setDialogTitleArchiveReopen("Confirm Archiving of List");
    setDialogContentArchiveReopen("Do you want to archive this list?");
    setIsOpenArchiveReopenDialog(true);
  };

  const btnHdlReopenList = async () => {
    setDialogTitleArchiveReopen("Confirm Reopening of List");
    setDialogContentArchiveReopen("Do you want to reopen this list?");
    setIsOpenArchiveReopenDialog(true);
  };

  const btnHdlCopyList = async () => {
    setDialogCopyTitle("Copy Current List to New List");
    setDialogCopyContent("Enter new name of copy list");
    setDialogCopyConfirmationText("Copy");
    setIsOpenCopyDialog(true);
  };

  const handleArchiveReopenDlgCloseNo = () => {
    setIsOpenArchiveReopenDialog(false);
  };

  const handleCopyDlgCloseNo = () => {
    setIsOpenCopyDialog(false);
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
    <div>
      <div className={`${themeClassName} flex flex-row justify-between mt-8`}>
        {isArchived ? (
          <>
            <button
              className={`${themeClassName} border bg-formButtonBg text-formButtonText p-2 rounded-lg flex flex-row w-36 items-center
                        hover:bg-formButtonBgHover hover:text-formButtonTextHover  hover:border-formButtonBorder`}
              onClick={btnHdlReopenList}
            >
              <Image
                src={reopen_icon}
                width={32}
                height={32}
                className={`w-8 mr-2`}
                alt="reopen icon"
              />
              Reopen this list
            </button>
            <ConfirmationDialog
              isDialogOpen={isOpenArchiveReopenDialog}
              dialogTitle={dialogTitleArchiveReopen}
              dialogContent={dialogContentArchiveReopen}
              hdlCloseNo={handleArchiveReopenDlgCloseNo}
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
                width={32}
                height={32}
                className={`w-8 mr-2`}
                alt="archive icon"
              />
              Archive this list
            </button>
            <ConfirmationDialog
              isDialogOpen={isOpenArchiveReopenDialog}
              dialogTitle={dialogTitleArchiveReopen}
              dialogContent={dialogContentArchiveReopen}
              hdlCloseNo={handleArchiveReopenDlgCloseNo}
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
          isNewObjectDialogOpen={isOpenCopyDialog}
          dialogTitle={dialogCopyTitle}
          dialogContentText={dialogCopyContent}
          confirmationText={dialogCopyConfirmationText}
          hdlCloseNo={handleCopyDlgCloseNo}
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
      <div>
        {isShowCopyResult && (
          <ListCopyResult
            userDataId={userId}
            listId={duplicateListId}
            listName={duplicateListName}
          />
        )}
      </div>
    </div>
  );
}
