import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
  isDialogOpen,
  dialogTitle,
  dialogContent,
  hdlCloseNo,
  hdlCloseYes,
}: {
  isDialogOpen: boolean;
  dialogTitle: string;
  dialogContent: string;
  hdlCloseNo: () => void;
  hdlCloseYes: () => void;
}) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={hdlCloseNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hdlCloseNo}>No</Button>
        <Button onClick={hdlCloseYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
