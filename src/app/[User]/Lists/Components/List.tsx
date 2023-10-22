"use client";
import ListCard from "./ListCard";
import { forwardRef, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteList } from "@/app/Services/fetchWrapper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { TList } from "@/app/Types/Types";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function List({
  list_items,
  userId,
  theme,
}: {
  list_items: Array<TList>;
  userId: number;
  theme: Themes;
}) {
  const [editMode, setEditMode] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [label, setLabel] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("Success");
  const [arrayList, setArrayList] = useState(list_items);

  const handleClickOpen = (id: number, list_name: string) => {
    setOpenDialog(true);
    setLabel(list_name);
    setDeleteId(id);
  };

  const themeClassName = getThemeClassName(theme);

  const handleCloseYes = async () => {
    // delete in database
    try {
      const responseData = await deleteList(deleteId);

      // delete from array
      const newArrayList = [...arrayList];
      const deleteIndex = newArrayList.findIndex(
        (list) => list.id === deleteId
      );
      newArrayList.splice(deleteIndex, 1);
      setArrayList(newArrayList);

      setOpenDialog(false);
      setSnackbarMessage(`${responseData.list_name} was successfully deleted.`);
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
    setOpenDialog(false);
  };

  const hdlEditBtnClick = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
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
    <>
      <div
        className={`${themeClassName} flex flex-rows items-center p-2 ${
          editMode ? `bg-orange-100` : `bg-bodyBg`
        } rounded-lg`}
      >
        <button
          className={`${themeClassName} px-4 py-1 text-lg border border-formButtonBorder bg-formButtonBg text-formButtonText 
                      hover:bg-formButtonBgHover hover:text-formButtonTextHover rounded-lg`}
          onClick={hdlEditBtnClick}
        >
          {editMode ? "Stop Editing" : "Edit List"}
        </button>
        {editMode && (
          <h2 className={`${themeClassName} ml-2 text-colorWarning`}>
            Edit mode is on.
          </h2>
        )}
      </div>
      {arrayList.length > 0 ? (
        arrayList.map((list) => {
          return (
            <ListCard
              key={list.id}
              id={list.id}
              list_name={list.list_name}
              updated_at={list.updated_at}
              user_id={userId}
              editMode={editMode}
              hdlDeleteBtn={(list_name: string) => {
                handleClickOpen(list.id, list_name);
              }}
              theme={theme}
            />
          );
        })
      ) : (
        <p className={`${themeClassName} text-defaultColor`}>No lists found.</p>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${label} from Lists`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {label} from the lists?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo}>No</Button>
          <Button onClick={handleCloseYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
}
