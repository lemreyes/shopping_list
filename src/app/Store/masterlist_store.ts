import { create } from "zustand";

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
