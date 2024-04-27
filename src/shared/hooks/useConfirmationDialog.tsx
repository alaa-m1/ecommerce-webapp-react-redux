import React, { useState } from "react";
import { GenericDialog } from "shared";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
/**
 *
 * @param title The title of the confirmation dialog
 * @param text The main content of the confirmation dialog
 * @returns
 */
export const useConfirmationDialog = (title: string, text: string) => {
  const [promise, setPromise] = useState<any>(null);
  const confirm = () =>
    new Promise((resolve, reject) => setPromise({ resolve }));
  const handleOnConfirm = () => {
    promise?.resolve(true);
    setPromise(null);
  };
  const handleOnClose = () => {
    promise?.resolve(false);
    setPromise(null);
  };
  const ConfirmationDialog = () => (
    <GenericDialog
      open={promise !== null}
      titleOptions={{
        title: title,
      }}
      contentOptions={{
        text: text,
      }}
      actionOptions={{
        confirmBtn: { label: "Yes", startIcon: <CheckCircle /> },
        cancelBtn: { label: "No", startIcon: <CancelIcon /> },
      }}
      onConfirm={handleOnConfirm}
      onClose={handleOnClose}
    />
  );
  return { confirm, ConfirmationDialog };
};

/***
    const { confirm, ConfirmationDialog } = useConfirmationDialog(
    "Delete Confirmation",
    "Do you want to delete the selected record?"
     );
 */