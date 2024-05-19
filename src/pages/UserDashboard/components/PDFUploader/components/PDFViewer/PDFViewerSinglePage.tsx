import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFData } from "../../PDFUploader";

type PDFViewerSinglePageProps = {
  pdfData: PDFData;
};

export const PDFViewerSinglePage = ({ pdfData }: PDFViewerSinglePageProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPN) => prevPN + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

  return (
    <Box>
      <Box>
        <Button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          sx={{ ml: 1 }}
        >
          Next
        </Button>
        <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </Button>
      </Box>
      <Typography>{`Page ${pageNumber || (numPages ? 1 : "--")} of ${
        numPages || "--"
      }`}</Typography>
      <Document
        file={pdfData.data}
        onLoadSuccess={onDocumentLoadSuccess}
        // options={{ workerSrc: "/pdf.worker.js" }}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
      <Box>
        <Typography>{`${pdfData.name} - (${numPages}) pages`}</Typography>
      </Box>
    </Box>
  );
};
