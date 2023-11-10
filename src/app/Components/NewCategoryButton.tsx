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
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createNewCategory } from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";
import NewObjectDialog from "./NewObjectDialog";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewCategoryButton() {
  const [categoryName, setCategoryName] = useState("");
  const [openNewCategoryForm, setOpenNewCategoryForm] = useState(false);
  const [isValidEntry, setIsValidEntry] = useState(false);
  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const categories = useMasterlistStore((state: any) => state.categories);
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const handleCategoryOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);

    if (event.target.value.length > 0) {
      setIsValidEntry(true);
    } else {
      setIsValidEntry(false);
    }
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

      const responseData = await createNewCategory(categoryName);

      newMasterList.push(responseData);

      updateCategories(newMasterList);

      setOpenNewCategoryForm(false);

      setSnackbarMessage(
        `${responseData.category_name} category was successfully added.`
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
        className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:border-orange-800 hover:bg-orange-100`}
        onClick={handleClickOpen}
      >
        Create new Category{" "}
        <Image src={add_icon} alt="add" className="inline w-6" />
      </button>
      <NewObjectDialog
        isNewObjectDialogOpen={openNewCategoryForm}
        dialogTitle={"Add new Category"}
        dialogContentText={`Enter name of new category`}
        confirmationText={"Add category"}
        isValidEntry={isValidEntry}
        hdlCloseNo={handleClose}
        hdlCloseYes={handleAddCategory}
        hdlOnChange={handleCategoryOnChange}
      />
    </>
  );
}
