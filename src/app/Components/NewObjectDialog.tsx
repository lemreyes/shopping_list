import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export default function NewObjectDialog({
  isNewObjectDialogOpen,
  dialogTitle,
  dialogContentText,
  confirmationText,
  hdlCloseNo,
  hdlCloseYes,
  hdlOnChange,
}: {
  isNewObjectDialogOpen: boolean;
  dialogTitle: string;
  dialogContentText: string;
  confirmationText: string;
  hdlCloseNo: () => void;
  hdlCloseYes: () => void;
  hdlOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Dialog
      open={isNewObjectDialogOpen}
      onClose={hdlCloseNo}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={hdlOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={hdlCloseNo}>Cancel</Button>
        <Button onClick={hdlCloseYes}>{confirmationText}</Button>
      </DialogActions>
    </Dialog>
  );
}
