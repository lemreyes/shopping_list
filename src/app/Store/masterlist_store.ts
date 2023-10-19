import { create } from "zustand";
import { TCategory } from "../Types/Types";

interface MasterList {
  categories: Array<TCategory>;
}

export const useMasterlistStore = create((set) => ({
  categories: [],
  updateCategories: (updatedCategories: Array<TCategory>) =>
    set({ categories: updatedCategories }),
  editMode: false,
  setEditMode: (targetMode: boolean) => set({ editMode: targetMode }),
}));
