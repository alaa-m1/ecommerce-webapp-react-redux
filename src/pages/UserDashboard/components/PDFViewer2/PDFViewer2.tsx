import React from "react";
import { StyleSheet } from '@react-pdf/renderer';
import { MyDocument1 } from "./MyDocument1";
import { PDFViewer } from '@react-pdf/renderer';

// Create Document Component
export const PDFViewer2 = () => (
  <PDFViewer>
    <MyDocument1 />
  </PDFViewer>
);