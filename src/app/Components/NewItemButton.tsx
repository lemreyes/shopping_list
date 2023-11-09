import * as React from "react";

import add_icon from "../../../public/assets/add_icon.svg";

import Image from "next/image";

import { useMasterlistStore } from "../Store/masterlist_store";
import { ChangeEvent, useState } from "react";
import { createNewItem } from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";
import { TCategory } from "../Types/Types";
import NewObjectDialog from "./NewObjectDialog";

export default function NewItemButton({
  category_id,
  category_name,
}: {
  category_id: number;
  category_name: string;
}) {
  const [itemName, setItemName] = useState("");
  const [openNewItemForm, setOpenNewItemForm] = React.useState(false);
  const [isValidEntry, setIsValidEntry] = useState(false);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMasterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );
  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const hdlItemNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);

    if (event.target.value.length > 0) {
      setIsValidEntry(true);
    } else {
      setIsValidEntry(false);
    }
  };

  const handleClickOpen = () => {
    setOpenNewItemForm(true);
  };

  const handleClose = () => {
    setOpenNewItemForm(false);
  };

  const handleAddItem = async () => {
    try {
      const newMasterList: Array<TCategory> = [...masterlist];

      const categoryIndex: number = newMasterList.findIndex(
        (categoryInList: TCategory) => categoryInList.id === category_id
      );

      const responseData = await createNewItem(itemName, category_id);

      // update masterlist store
      newMasterList[categoryIndex].items.push(responseData);
      updateMasterList(newMasterList);

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
        className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:border-orange-800 hover:bg-orange-100`}
        onClick={handleClickOpen}
      >
        {" "}
        New Item
        <Image src={add_icon} alt="add" className="inline w-6" />
      </button>
      <NewObjectDialog
        isNewObjectDialogOpen={openNewItemForm}
        dialogTitle={"Add new item"}
        dialogContentText={`Add a new item to ${category_name}`}
        confirmationText={"Add item"}
        isValidEntry={isValidEntry}
        hdlCloseNo={handleClose}
        hdlCloseYes={handleAddItem}
        hdlOnChange={hdlItemNameOnChange}
      />
    </>
  );
}
