import React, { ChangeEvent } from "react";
import { ColoredDevider } from "shared";
import { PDFViewer } from "./components/PDFViewer/PDFViewer";
import { Box } from "@mui/material";
export type PDFData={
  data: string | ArrayBuffer | null,
  name: string
}
export const PDFUploader = () => {
  const [pdfData, setPdfData] = React.useState<PDFData | null>(null);
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPdfData({data:reader.result, name:file.name});
      };
    }
  };
  return (
    <>
      <Box>Upload your profile document</Box>
      <input type="file" accept="application/pdf" onChange={handleFileSelect} />
      <ColoredDevider />
      {pdfData && <PDFViewer pdfData={pdfData} />}
    </>
  );
};
