import { create } from "zustand";

interface MasterList {
  categories: Array<Category>;
}

export const useMasterlistStore = create((set) => ({
  categories: [],
  updateCategories: (updatedCategories: Array<Category>) =>
    set({ categories: updatedCategories }),
  editMode: false,
  setEditMode: (targetMode: boolean) => set({ editMode: targetMode }),
}));
