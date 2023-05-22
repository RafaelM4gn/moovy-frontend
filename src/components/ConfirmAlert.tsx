import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmAlert({
  openProps,
  onCloseProps,
  onAgreeProps,
}: {
  openProps: boolean;
  onCloseProps: () => void;
  onAgreeProps: () => void;
}) {
  const handleClose = () => {
    onCloseProps();
  };

  return (
    <div>
      <Dialog
        open={openProps}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this movie?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you delete this movie you will loose your review
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseProps}>NO</Button>
          <Button onClick={onAgreeProps} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
