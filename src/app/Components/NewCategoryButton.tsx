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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewCategoryButton() {
  let [categoryName, setCategoryName] = useState("");
  const [openNewCategoryForm, setOpenNewCategoryForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const handleAddCategory = async () => {
    try {
      const newMasterList = [...categories];

      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName,
        }),
      });

      if (!response.ok) {
        throw new Error("Category error");
      }

      const responseData = await response.json();
      console.log("Response data: ", responseData);

      newMasterList.push(responseData);
      updateCategories(newMasterList);

      setOpenNewCategoryForm(false);
    } catch (error) {}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          This is an error message!
        </Alert>
      </Snackbar>
    </>
  );
}
