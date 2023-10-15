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

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function List({
  list_items,
  userId,
}: {
  list_items: Array<IList>;
  userId: number;
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
        className={`flex flex-rows items-center p-2 ${
          editMode ? `bg-orange-100` : `bg-white`
        } rounded-lg`}
      >
        <button
          className="px-4 py-1 font-bold text-lg border border-gray-900 bg-white hover:bg-gray-600 hover:text-white rounded-lg hover:"
          onClick={hdlEditBtnClick}
        >
          {editMode ? "Stop Editing" : "Edit List"}
        </button>
        {editMode && <h2 className="ml-2 text-red-900">Edit mode is on.</h2>}
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
            />
          );
        })
      ) : (
        <p>No lists found.</p>
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
