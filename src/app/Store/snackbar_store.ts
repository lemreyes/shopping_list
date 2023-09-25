import { create } from "zustand";

export const useSnackbarStore = create((set) => ({
  openSnackbar: false,
  setOpenSnackbar: (status: boolean) =>
    set({
      openSnackbar: status,
    }),
  message: "",
  setMessage: (newMessage: string) =>
    set({
      message: newMessage,
    }),
  severity: "success",
  setSeverity: (newSeverity: string) =>
    set({
      severity: newSeverity,
    }),
}));
