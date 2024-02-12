import React, { memo, useCallback, useState } from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import add_icon_dark from "../../../public/assets/add_icon_dark.svg";
import trash_icon from "../../../public/assets/trash_icon.svg";
import trash_icon_dark from "../../../public/assets/trash_icon_dark.svg";
import Image from "next/image";

import { deleteItem } from "../Services/fetchWrapper";
import {
  TCategory,
  TItem,
} from "../Types/Types";
import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";
import ConfirmationDialog from "./ConfirmationDialog";

const Item = memo(function Item({
  category_id,
  category,
  label,
  item_id,
  theme,
  editMode,
  masterlist,
  updateMasterList,
  setSnackbarMessage,
  setSeverity,
  setOpenSnackbar,
  getItemCount,
  hdlItemBtnClick,
}: {
  category_id: number;
  category: string;
  label: string;
  item_id: number;
  theme: Themes;
  editMode: any;
  masterlist: any;
  updateMasterList: any;
  setSnackbarMessage: any;
  setSeverity: any;
  setOpenSnackbar: any;
  getItemCount: (category_id: number, item_id: number) => number;
  hdlItemBtnClick: (
    label: string,
    item_id: number,
    category_id: number,
    categoryName: string,
    handleClickOpen: () => void
  ) => void;
}) {
  console.log(`Item ${label}`);
  const [openDialog, setOpenDialog] = React.useState(false);
  const themeClassName = getThemeClassName(theme);
  const [isHover, setIsHover] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseYes = useCallback(async () => {
    // delete in database
    try {
      deleteItem(item_id);
      let itemName = "";

      // update master list
      const newMasterList = [...masterlist];
      const categoryIndex: number = masterlist.findIndex(
        (categoryInList: TCategory) => categoryInList.id === category_id
      );

      if (categoryIndex >= 0) {
        const itemIndex = masterlist[categoryIndex].items.findIndex(
          (itemInList: TItem) => itemInList.id === item_id
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

      updateMasterList(newMasterList);

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
  }, [
    category_id,
    item_id,
    masterlist,
    setOpenSnackbar,
    setSeverity,
    setSnackbarMessage,
    updateMasterList,
  ]);

  const handleCloseNo = () => {
    setOpenDialog(false);
  };

  const itemCount = getItemCount(category_id, item_id);

  const getAddIconStyle = () => {
    if (theme === Themes.ThemeLight) {
      if (isHover) {
        return add_icon;
      } else {
        return add_icon_dark;
      }
    } else {
      if (isHover) {
        return add_icon;
      } else {
        return add_icon_dark;
      }
    }
  };

  const getTrashIconStyle = () => {
    if (theme === Themes.ThemeLight) {
      if (isHover) {
        return trash_icon;
      } else {
        return trash_icon_dark;
      }
    } else {
      if (isHover) {
        return trash_icon;
      } else {
        return trash_icon_dark;
      }
    }
  };

  const hdlMouseEnter = () => {
    setIsHover(true);
  };

  const hdlMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <button
        value={label}
        className={`${themeClassName} border ${
          itemCount > 0
            ? "border-green-600 bg-green-600"
            : "border-gray-300 bg-formButtonBg"
        } rounded-xl py-2 px-2 mt-2 mr-2 h-12 text-sm text-formButtonText  
          hover:border-formButtonBorder hover:text-formButtonTextHover hover:bg-formButtonBgHover`}
        onClick={() =>
          hdlItemBtnClick(
            label,
            item_id,
            category_id,
            category,
            handleClickOpen
          )
        }
        onMouseEnter={hdlMouseEnter}
        onMouseLeave={hdlMouseLeave}
      >
        {label}
        {editMode ? (
          <Image
            src={getTrashIconStyle()}
            alt="delete"
            className="inline w-4 ml-2"
          />
        ) : itemCount > 0 ? (
          <span className="text_lg ml-3">{itemCount}</span>
        ) : (
          <Image
            src={getAddIconStyle()}
            alt="add"
            className="inline w-4 ml-2"
          />
        )}
      </button>
      <ConfirmationDialog
        isDialogOpen={openDialog}
        dialogTitle={`Delete ${label} from Master List`}
        dialogContent={`Are you sure you want to delete ${label} from the Master list?`}
        hdlCloseNo={handleCloseNo}
        hdlCloseYes={handleCloseYes}
      />
    </>
  );
});

export default Item;
