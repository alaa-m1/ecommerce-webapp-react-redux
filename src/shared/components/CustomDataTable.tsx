import { Box, styled, Tooltip, Typography } from "@mui/material";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { Button } from "primereact/button";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, {
  ComponentProps,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "utils/redux/hooks";

export type ExportColumns = {
  title: string;
  dataKey: string;
};

type CustomDataTableProps = ComponentProps<typeof DataTable> & {
  columns: React.ReactNode[];
  exportColumns?: ExportColumns[];
};

export const CustomDataTable = ({
  columns,
  filters: initFilters,
  exportColumns = [],
  ...props
}: CustomDataTableProps) => {
  const { t } = useTranslation();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const docDirection = useAppSelector((state) => state.user.direction);
  const [filters, setFilters] = useState<DataTableFilterMeta>(
    initFilters ?? {}
  );

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value ?? "";
    const filtersCopy: DataTableFilterMeta = deepClone(filters);
    if (
      (filtersCopy?.["global"] as unknown as DataTableFilterMetaData)?.value
    ) {
      (filtersCopy["global"] as unknown as DataTableFilterMetaData).value =
        value;
    }

    setFilters(filtersCopy);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography>{t("table.general_search")}</Typography>
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder={t("table.search_for")}
        />
      </Box>
    );
  };
  const header = renderHeader();
  const tableRef = useRef<any>(null);

  const exportCSV = (selectionOnly: any) => {
    tableRef.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("portrait", "px");

        (doc as any).autoTable(exportColumns, props.value);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(props.value as any);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: any) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const paginatorRight = (
    <Box sx={{ display: "flex", gap: "10px" }}>
      {exportColumns.length > 0 ? (
        <Tooltip title={t("table.export_as_pdf")}>
          <Button
            type="button"
            icon="pi pi-file-pdf"
            severity="success"
            rounded
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />
        </Tooltip>
      ) : null}
      {exportColumns.length > 0 ? (
        <Tooltip title={t("table.export_as_excel")}>
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
        </Tooltip>
      ) : null}
    </Box>
  );
  const paginatorLeft = null;

  useLayoutEffect(() => {
    const elements = document.querySelectorAll(".p-datatable-wrapper");
    elements.forEach((element) => {
      if (element) {
        if (docDirection === "rtl") {
          element.scrollLeft = element.scrollWidth;
        } else {
          element.scrollLeft = 0;
        }
      }
    });
  }, [docDirection, props.value]);

  return (
    <TableContainer>
      <DataTable
        {...props}
        header={header}
        showGridlines
        stripedRows
        sortMode="multiple"
        removableSort
        scrollable
        resizableColumns
        ref={tableRef}
        // tableStyle={{width:"100%"}}
        columnResizeMode="expand"
        // scrollHeight="flex"
        // scrollHeight="200px"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[2, 10, 25, 50]}
        currentPageReportTemplate={t("table.repeat_template")}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        // size="normal"
        rowHover
        filters={filters}
        filterDisplay="menu"
        // responsiveLayout="scroll"
        emptyMessage={t("table.no_items")}
        dragSelection
        // tableStyle={{ width: '500px',height: '500px' }}
      >
        {columns}
      </DataTable>
    </TableContainer>
  );
};

const TableContainer = styled(Box)`
  & .p-datatable-wrapper {
    /* @noflip */
    direction: ltr;
  }
  & .p-datatable-table {
    /* @noflip */
    direction: ${({ theme }) => theme.direction};
    overflow: auto;
  }
  & .p-datatable-table {
    thead {
      th {
        background-color: #eeeeee;
        color: ${({ theme }) => theme.palette.primary.light};
        & path {
          color: ${({ theme }) => theme.palette.secondary.main};
        }
      }
    }
  }
`;
