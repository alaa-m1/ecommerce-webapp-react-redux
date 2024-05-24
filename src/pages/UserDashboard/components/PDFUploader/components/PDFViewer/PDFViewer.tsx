import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFData } from "../../PDFUploader";

type PDFViewerProps = {
  pdfData: PDFData;
};

export function PDFViewer({ pdfData }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

  return (
    <Box>
      <Document
        file={pdfData.data}
        onLoadSuccess={onDocumentLoadSuccess}
        // options={{ workerSrc: "/pdf.worker.js" }}
        onLoadError={() => {
          console.log("error while loading the PDF file");
        }}
        // onLoadProgress
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Fragment key={`page_${index + 1}`}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            Page: {index + 1}
            </Box>
            <Page
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Fragment>
        ))}
      </Document>
      <Box>
        <Typography>{`${pdfData.name} - (${numPages}) pages.`}</Typography>
      </Box>
    </Box>
  );
}
