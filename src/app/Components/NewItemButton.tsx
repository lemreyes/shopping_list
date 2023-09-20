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

export default function NewItemButton({
  category_id,
  category_name,
}: {
  category_id: number;
  category_name: string;
}) {
  let [itemName, setItemName] = useState("");
  let [itemNote, setItemNote] = useState("");
  let [itemImage, setItemImage] = useState("");
  const [openNewItemForm, setOpenNewItemForm] = React.useState(false);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const hdlItemNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const hdlItemNoteOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemNote(event.target.value);
  };

  const hdlItemImageOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemImage(event.target.value);
  };

  const handleClickOpen = () => {
    setOpenNewItemForm(true);
  };

  const handleClose = () => {
    setOpenNewItemForm(false);
  };

  const handleAddItem = () => {
    const newMasterList: Array<Category> = [...masterlist];

    const categoryIndex: number = newMasterList.findIndex(
      (categoryInList: Category) => categoryInList.id === category_id
    );

    // TODO: generate actual id from server
    // update database first, then update the masterlist store
    const newItem: Item = {
      id: "new",
      name: itemName,
      quantity: 0,
    };

    // update masterlist store
    newMasterList[categoryIndex].items.push(newItem);
    updateMaterList(newMasterList);

    setOpenNewItemForm(false);
  };

  return (
    <>
      <button
        className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:drop-shadow-2xl hover:border-orange-800 hover:bg-orange-100`}
      >
        {" "}
        New Item
        <Image
          src={add_icon}
          alt="add"
          className="inline w-6"
          onClick={handleClickOpen}
        />
      </button>
      <Dialog open={openNewItemForm} onClose={handleClose}>
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
          <TextField
            margin="dense"
            id="name"
            label="Note (optional)"
            type="text"
            fullWidth
            variant="standard"
            onChange={hdlItemNoteOnChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Image"
            type="text"
            fullWidth
            variant="standard"
            onChange={hdlItemImageOnChange}
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
