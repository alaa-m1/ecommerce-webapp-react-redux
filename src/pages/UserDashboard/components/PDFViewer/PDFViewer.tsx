import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
// import { Document, Page } from "react-pdf";

export function PDFViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Box>
      {/* <Document file="./publishing-paper.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </Box>
  );
}
