import React from "react";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export function PDFViewer({ pdf }: { pdf: any }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
  console.log("pdfjs=", pdfjs.version);
  return (
    <Box>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        // options={{ workerSrc: "/pdf.worker.js" }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
      <Box>
        <Typography>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </Typography>
      </Box>
    </Box>
  );
}
