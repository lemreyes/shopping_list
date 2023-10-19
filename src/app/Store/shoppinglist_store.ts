import { create } from "zustand";
import { TItem } from "../Types/Types";

export const useShoppingListStore = create((set) => ({
  shoppingList: [],
  updateShoppingList: (updatedList: Array<TItem>) =>
    set({
      shoppingList: updatedList,
    }),
  activeListId: null,
  updateActiveListId: (currentActiveListId: number) =>
    set({
      activeListId: currentActiveListId,
    }),
  activeListName: "",
  updateActiveListName: (newActiveListName: string) =>
    set({
      activeListName: newActiveListName,
    }),
}));
