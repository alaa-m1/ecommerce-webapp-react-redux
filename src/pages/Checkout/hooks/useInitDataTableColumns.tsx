import { Column, ColumnBodyOptions } from "primereact/column";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";
import { MappedPost } from "../components/InitDataTable";
import { Post } from "../utils/useNewPosts";
import { MappedCartCategory } from "../components/CheckoutDataTableExpansion";

export const useInitDataTableColumns = ({
  lockedCustomers,
  toggleLock,
}: {
  lockedCustomers: Post[];
  toggleLock: (data: Post, frozen: boolean, index: number) => void;
}): React.ReactNode[] => {
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(false);
  const statuses = ["low", "medium", "high"];


  const titleBodyTemplate = (rowData: MappedPost) => {
    return (
      <Typography
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          px: "5px",
        }}
      >
        {rowData.title}
      </Typography>
    );
  };

  const descriptionBodyTemplate = (rowData: MappedPost) => {
    return (
      <Typography
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          px: "5px",
        }}
      >
        {rowData.body}
      </Typography>
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "low":
        return "warning";

      case "medium":
        return "info";

      case "high":
        return "success";
    }
  };

  const statusBodyTemplate = useCallback((rowData: MappedCartCategory) => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      </Box>
    );
  }, []);

  const statusItemTemplate = useCallback((item: string) => {
    return <Tag value={item} severity={getSeverity(item)} />;
  }, []);

  const statusRowFilterTemplate = useCallback(
    (options: any) => {
      return (
        <React.Fragment>
          <Box className="mb-3 font-bold">{t("table.category_picker")}</Box>
          <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e: any) => options.filterApplyCallback(e.value)}
            itemTemplate={statusItemTemplate}
            placeholder="Select a Status"
            className="p-column-filter"
            showClear
          />
        </React.Fragment>
      );
    },
    [statusItemTemplate, statuses, t]
  );

  const actionBodyTemplate = useCallback(
    (rowData: MappedCartCategory) => {
      return (
        <Tooltip title="Remove">
          <Button
            disabled={disabled}
            icon="pi pi-times"
            rounded
            text
            aria-label="Decrease"
            severity="success"
          />
        </Tooltip>
      );
    },
    [disabled]
  );

  const lockTemplate = (rowData: Post, options: ColumnBodyOptions) => {
    const icon = options.frozenRow ? "pi pi-lock" : "pi pi-lock-open";
    const disabled = options.frozenRow ? false : lockedCustomers.length >= 2;

    return (
      <Button
        type="button"
        icon={icon}
        disabled={disabled}
        className="p-button-sm p-button-text"
        onClick={() =>
          toggleLock(rowData, options.frozenRow ?? false, options.rowIndex)
        }
      />
    );
  };

  return useMemo(
    () => [
      // <Column
      //   key="1"
      //   selectionMode="multiple"
      //   headerStyle={{ width: "3em" }}
      // ></Column>,
      <Column
        key="2"
        // frozen 
        header={"Title"}
        sortable
        sortField="title"
        showFilterMatchModes={false}
        filterMenuStyle={{ width: "14rem" }}
        style={{ maxWidth: "200px" }}
        filter
        // filterElement={categoryLabelFilterTemplate}
        body={titleBodyTemplate}
        field="title"
        filterField="title"
        filterPlaceholder="Search by post title"
      />,
      <Column
        key="3"
        field="body"
        header={"Description"}
        sortable
        filter
        filterField="body"
        filterPlaceholder="Search by product title"
        body={descriptionBodyTemplate}
        style={{ maxWidth: "200px", overflow: "hidden" }}
      />,

      <Column
        key="6"
        field="status"
        header="Status"
        sortable
        filterMenuStyle={{ width: "14rem" }}
        style={{ maxWidth: "150px" }}
        body={statusBodyTemplate}
        filter
        filterElement={statusRowFilterTemplate}
      />,
      <Column
        key="8"
        header={t("table.actions")}
        headerStyle={{ width: "4rem", textAlign: "center" }}
        bodyStyle={{ textAlign: "center", overflow: "visible" }}
        body={actionBodyTemplate}
      />,
      <Column
        key="9"
        style={{ flex: "0 0 4rem" }}
        body={lockTemplate}
      ></Column>,
    ],
    [actionBodyTemplate, lockTemplate, statusBodyTemplate, statusRowFilterTemplate, t]
  );
};
