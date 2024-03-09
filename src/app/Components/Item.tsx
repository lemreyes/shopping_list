import React, { memo, useEffect, useRef, useState } from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import add_icon_dark from "../../../public/assets/add_icon_dark.svg";
import trash_icon from "../../../public/assets/trash_icon.svg";
import trash_icon_dark from "../../../public/assets/trash_icon_dark.svg";
import Image from "next/image";

import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";
import ConfirmationDialog from "./ConfirmationDialog";
import { traceLog } from "../Utilities/logUtils";

const Item = memo(function Item({
  category_id,
  category,
  label,
  item_id,
  theme,
  editMode,
  getItemCount,
  hdlItemBtnClick,
  handleCloseYes,
}: {
  category_id: number;
  category: string;
  label: string;
  item_id: number;
  theme: Themes;
  editMode: any;
  getItemCount: (category_id: number, item_id: number) => number;
  hdlItemBtnClick: (
    label: string,
    item_id: number,
    category_id: number,
    categoryName: string,
    handleClickOpen: () => void
  ) => void;
  handleCloseYes: (
    item_id: number,
    category_id: number,
    handleCloseNo: () => void
  ) => Promise<void>;
}) {
  traceLog(`Item ${label}`);
  const [openDialog, setOpenDialog] = React.useState(false);
  const themeClassName = getThemeClassName(theme);
  const [isHover, setIsHover] = useState(false);

  // confirm props changed
  const prevcategory_id = useRef(category_id);
  useEffect(() => {
    if (prevcategory_id.current !== category_id) {
      traceLog("category_id has changed:", category_id);
      prevcategory_id.current = category_id;
    }
  }, [category_id]);

  const prevcategory = useRef(category);
  useEffect(() => {
    if (prevcategory.current !== category) {
      traceLog("category has changed:", category);
      prevcategory.current = category;
    }
  }, [category]);

  const prevlabel = useRef(label);
  useEffect(() => {
    if (prevlabel.current !== label) {
      traceLog("editMode has changed:", label);
      prevlabel.current = label;
    }
  }, [label]);

  const prevtheme = useRef(theme);
  useEffect(() => {
    if (prevtheme.current !== theme) {
      traceLog("theme has changed:", theme);
      prevtheme.current = theme;
    }
  }, [theme]);

  const previtem_id = useRef(item_id);
  useEffect(() => {
    if (previtem_id.current !== item_id) {
      traceLog("item_id has changed:", item_id);
      previtem_id.current = item_id;
    }
  }, [item_id]);

  const preveditMode = useRef(editMode);
  useEffect(() => {
    if (preveditMode.current !== editMode) {
      traceLog("item_id has changed:", editMode);
      preveditMode.current = editMode;
    }
  }, [editMode]);

  const prevgetItemCount = useRef(getItemCount);
  useEffect(() => {
    if (prevgetItemCount.current !== getItemCount) {
      traceLog("getItemCount has changed:", getItemCount);
      prevgetItemCount.current = getItemCount;
    }
  }, [getItemCount]);

  const prevhdlItemBtnClick = useRef(hdlItemBtnClick);
  useEffect(() => {
    if (prevhdlItemBtnClick.current !== hdlItemBtnClick) {
      traceLog("hdlItemBtnClick has changed:", hdlItemBtnClick);
      prevhdlItemBtnClick.current = hdlItemBtnClick;
    }
  }, [hdlItemBtnClick]);

  const prevhandleCloseYes = useRef(handleCloseYes);
  useEffect(() => {
    if (prevhandleCloseYes.current !== handleCloseYes) {
      traceLog("hdlItemBtnClick has changed:", handleCloseYes);
      prevhandleCloseYes.current = handleCloseYes;
    }
  }, [handleCloseYes]);
  //

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

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
        hdlCloseYes={() => handleCloseYes(item_id, category_id, handleCloseNo)}
      />
    </>
  );
});

export default Item;
