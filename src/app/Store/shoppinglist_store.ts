import { create } from "zustand";

export const useShoppingListStore = create((set) => ({
  shoppingList: [],
  updateShoppingList: (updatedList: Array<Item>) =>
    set({
      shoppingList: updatedList,
    }),
}));
