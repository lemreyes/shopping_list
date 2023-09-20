import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import add_icon from "../../../public/assets/add_icon.svg";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useMasterlistStore } from "../Store/masterlist_store";

export default function NewCategoryButton() {
  let [categoryName, setCategoryName] = useState("");
  const [openNewCategoryForm, setOpenNewCategoryForm] = React.useState(false);

  const categories = useMasterlistStore((state: any) => state.categories);
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const handleCategoryOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpenNewCategoryForm(true);
  };

  const handleClose = () => {
    setOpenNewCategoryForm(false);
  };

  const handleAddCategory = () => {
    const newMasterList = [...categories];

    // TODO: create new category from server side for unique id.
    // then update local master list
    const newCategory: Category = {
      id: 0,
      category_name: categoryName,
      items: [],
    };

    newMasterList.push(newCategory);
    updateCategories(newMasterList);

    setOpenNewCategoryForm(false);
  };

  return (
    <>
      <button
        className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:drop-shadow-2xl hover:border-orange-800 hover:bg-orange-100`}
        onClick={handleClickOpen}
      >
        Create new Category{" "}
        <Image src={add_icon} alt="add" className="inline w-6" />
      </button>
      <Dialog
        open={openNewCategoryForm}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add new Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter name of new category</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleCategoryOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add category</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
