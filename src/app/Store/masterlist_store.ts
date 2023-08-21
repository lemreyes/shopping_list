import { create } from "zustand";

interface MasterList {
  categories: Array<Category>;
}

export const useMasterlistStore = create((set) => ({
  categories: [],
  updateCategories: (updatedCategories: Array<Category>) =>
    set({ categories: updatedCategories }),
}));
