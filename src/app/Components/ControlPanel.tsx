"use client";
import ActiveListPanel from "./ActiveListPanel";
import Masterlist from "./Masterlist";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbarStore } from "../Store/snackbar_store";
import { useMasterlistStore } from "../Store/masterlist_store";
import { useShoppingListStore } from "../Store/shoppinglist_store";
import React, { useEffect } from "react";
import { TCategory, TList, TShoppingListItem } from "../Types/Types";
import { Themes } from "../Types/Enums";
import { createCategorizedShoppingList } from "../Utilities/shoppingListUtils";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ControlPanel({
  masterList,
  editListInfo,
  editShoppingListItems,
  userId,
  theme,
}: {
  masterList: Array<TCategory>;
  editListInfo: TList;
  editShoppingListItems: Array<TShoppingListItem>;
  userId: number;
  theme: Themes;
}) {
  // update masterlist store
  const updateCategories = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  useEffect(() => {
    updateCategories(masterList);
  }, [masterList, updateCategories]);

  // update shopping list store
  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );

  const updateActiveListId = useShoppingListStore(
    (state: any) => state.updateActiveListId
  );

  const updateActiveListName = useShoppingListStore(
    (state: any) => state.updateActiveListName
  );

  useEffect(() => {
    if (editListInfo || editShoppingListItems.length > 0) {
      const categorizedShoppingList = createCategorizedShoppingList(
        editShoppingListItems,
        masterList
      );
      updateShoppingList(categorizedShoppingList);
      updateActiveListId(editListInfo.id);
      updateActiveListName(editListInfo.list_name);
    }
  }, [
    editListInfo,
    editShoppingListItems,
    updateShoppingList,
    updateActiveListId,
    updateActiveListName,
    masterList,
  ]);

  // get snackbar store
  const openSnackbar = useSnackbarStore((state: any) => state.openSnackbar);
  const snackbarMessage = useSnackbarStore((state: any) => state.message);
  const severity = useSnackbarStore((state: any) => state.severity);

  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );

  const handleCloseSnackber = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <main className="flex flex-col desktop:flex-row min-h-[92vh]">
      <Masterlist theme={theme} />
      <ActiveListPanel />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackber}
      >
        <Alert
          onClose={handleCloseSnackber}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}
