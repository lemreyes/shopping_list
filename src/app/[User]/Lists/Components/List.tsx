"use client";
import ListCard from "./ListCard";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  const handleClickOpen = (id: number, list_name: string) => {
    setOpenDialog(true);
    setLabel(list_name);
    setDeleteId(id)
  };

  const handleCloseYes = async () => {
    // delete in database
    try {
      setOpenDialog(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
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
      {list_items.length > 0 ? (
        list_items.map((list_items) => {
          return (
            <ListCard
              key={list_items.id}
              id={list_items.id}
              list_name={list_items.list_name}
              updated_at={list_items.updated_at}
              user_id={userId}
              editMode={editMode}
              hdlDeleteBtn={(list_name: string) => {
                handleClickOpen(list_items.id, list_name);
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
    </>
  );
}
