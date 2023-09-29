import * as React from "react";

import add_icon from "../../../public/assets/add_icon.svg";

import Image from "next/image";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useMasterlistStore } from "../Store/masterlist_store";
import { ChangeEvent, useState } from "react";
import { createNewItem } from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";

export default function NewItemButton({
  category_id,
  category_name,
}: {
  category_id: number;
  category_name: string;
}) {
  const [itemName, setItemName] = useState("");
  const [openNewItemForm, setOpenNewItemForm] = React.useState(false);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );
  const setSnackbarMessage = useSnackbarStore(
    (state: any) => state.setMessage
  );
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const hdlItemNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpenNewItemForm(true);
  };

  const handleClose = () => {
    setOpenNewItemForm(false);
  };

  const handleAddItem = async () => {
    try {
      const newMasterList: Array<Category> = [...masterlist];

      const categoryIndex: number = newMasterList.findIndex(
        (categoryInList: Category) => categoryInList.id === category_id
      );

      const responseData = await createNewItem(itemName, category_id);

      // update masterlist store
      newMasterList[categoryIndex].items.push(responseData);
      updateMaterList(newMasterList);

      setOpenNewItemForm(false);

      setSnackbarMessage(
        `${responseData.item_name} item was successfully added.`
      );
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

  return (
    <>
      <button
        className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:drop-shadow-2xl hover:border-orange-800 hover:bg-orange-100`}
        onClick={handleClickOpen}
      >
        {" "}
        New Item
        <Image src={add_icon} alt="add" className="inline w-6" />
      </button>
      <Dialog
        open={openNewItemForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new item to {category_name}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={hdlItemNameOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddItem}>Add item</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
