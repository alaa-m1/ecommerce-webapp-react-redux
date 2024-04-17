import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Paper,
  PaperProps,
} from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

type ConfirmationDialogProps = DialogProps & {
  id?: string;
  open: boolean;
  onClose: (value: boolean) => void;
  title?: string;
  dialogContent?: React.ReactNode;
  dialogActionsBtns?: {
    okBtn: boolean;
    okBtnLabel?: string;
    cancelBtn: boolean;
    cancelBtnLabel?: string;
  };
};

export const ConfirmationDialog = ({
  onClose,
  open,
  title,
  dialogContent,
  dialogActionsBtns,
  ...props
}: ConfirmationDialogProps) => {
  const radioGroupRef = useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      scroll="paper"
      aria-describedby="confirmation-dialog-description"
      {...props}
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: "move" }}
        sx={{ m: 0, p: 2 }}
        id="draggable-dialog-title"
      >
        {title ?? "Confirmation Dialog"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCancel}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {dialogContent ?? (
          <DialogContentText id="confirmation-dialog-description">
            Accept the process
          </DialogContentText>
        )}
      </DialogContent>
      {dialogActionsBtns ? (
        <DialogActions>
          {dialogActionsBtns.cancelBtn && (
            <Button autoFocus onClick={handleCancel}>
              {dialogActionsBtns.cancelBtnLabel ?? "Cancel"}
            </Button>
          )}
          {dialogActionsBtns.okBtn && (
            <Button onClick={handleOk}>
              {dialogActionsBtns.okBtnLabel ?? "Ok"}
            </Button>
          )}
        </DialogActions>
      ) : (
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};
