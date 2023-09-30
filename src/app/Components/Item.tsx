import React from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import trash_icon from "../../../public/assets/trash_icon.svg";
import Image from "next/image";

import { useShoppingListStore } from "../Store/shoppinglist_store";
import { useMasterlistStore } from "../Store/masterlist_store";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteItem } from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";

export default function Item({
  category_id,
  category,
  label,
  item_id,
}: {
  category_id: number;
  category: string;
  label: string;
  item_id: number;
}) {
  const shoppingList: Array<ShoppingListCategory> = useShoppingListStore(
    (state: any) => state.shoppingList
  );
  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );
  const activeListId = useShoppingListStore((state: any) => state.activeListId);

  const [openDialog, setOpenDialog] = React.useState(false);

  const editMode = useMasterlistStore((state: any) => state.editMode);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseYes = async () => {
    // delete in database
    try {
      deleteItem(item_id);
      let itemName = "";

      // update master list
      const newMasterList = [...masterlist];
      const categoryIndex: number = masterlist.findIndex(
        (categoryInList: Category) => categoryInList.id === category_id
      );

      if (categoryIndex >= 0) {
        const itemIndex = masterlist[categoryIndex].items.findIndex(
          (itemInList: Item) => itemInList.id === item_id
        );

        itemName = masterlist[categoryIndex].items[itemIndex].item_name;

        if (itemIndex >= 0) {
          newMasterList[categoryIndex].items.splice(itemIndex, 1);

          // delete category if item list is empty
          if (newMasterList[categoryIndex].items.length === 0) {
            newMasterList.splice(categoryIndex, 1);
          }
        } else {
          // do nothing
        }
      } else {
        // do nothing
      }

      updateMaterList(newMasterList);

      setOpenDialog(false);

      setSnackbarMessage(`${itemName} was successfully deleted.`);
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

  // find this category in the shoppingList
  const getItemCount = () => {
    const matchedCategory: ShoppingListCategory | undefined = shoppingList.find(
      (categoryInList) => categoryInList.id === category_id
    );

    if (matchedCategory) {
      const matchedItem = matchedCategory.items?.find(
        (itemInList: ShoppingListItem) => itemInList.masterItemId === item_id
      );
      if (matchedItem) {
        return matchedItem.quantity;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const hdlItemBtnClick = () => {
    if (editMode) {
      handleClickOpen();
    } else {
      // construct object
      const newShoppingList = [...shoppingList];
      const newListItem: ShoppingListItem = {
        id: 0,
        listed_item_name: label,
        quantity: 1,
        is_purchased: false,
        masterItemId: item_id,
        categoryId: category_id,
        listId: activeListId,
      };

      // find the category
      const matchedCategory: ShoppingListCategory | undefined = newShoppingList.find(
        (categoryInList) => categoryInList.id === category_id
      );
      if (matchedCategory) {
        // find if there is existing item
        const matchedItem = matchedCategory.items?.find(
          (itemInList: ShoppingListItem) => itemInList.masterItemId === item_id
        );
        if (matchedItem) {
          matchedItem.quantity++;
        } else {
          matchedCategory.items?.push(newListItem);
        }
        updateShoppingList(newShoppingList);
      } else {
        // category not found so add new category
        const newCategoryInList = {
          id: category_id,
          category_name: category,
          items: [newListItem],
        };
        newShoppingList.push(newCategoryInList);
        updateShoppingList(newShoppingList);
      }
    }
  };

  const itemCount = getItemCount();

  return (
    <>
      <button
        value={label}
        className={`border ${
          itemCount > 0 ? "border-black" : "border-gray-300"
        } rounded-xl py-2 px-2 mt-2 mr-2 text-sm hover:border-black hover:bg-gray-200`}
        onClick={hdlItemBtnClick}
      >
        {label}{" "}
        {editMode ? (
          <Image src={trash_icon} alt="delete" className="inline w-6" />
        ) : itemCount > 0 ? (
          <span className="text_lg ml-3">{itemCount}</span>
        ) : (
          <Image src={add_icon} alt="add" className="inline w-6" />
        )}
      </button>
      <Dialog
        open={openDialog}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${label} from Master List`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {label} from the Master list?
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
