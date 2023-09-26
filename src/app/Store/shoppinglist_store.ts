import { create } from "zustand";

export const useShoppingListStore = create((set) => ({
  shoppingList: [],
  updateShoppingList: (updatedList: Array<Item>) =>
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
