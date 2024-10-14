import React, { useState, useMemo, useEffect } from "react";
import { DataTableFilterMeta, SortOrder } from "primereact/datatable";
import { Box } from "@mui/material";
import "./ItemsDataTable.scss";
import { CustomDataTable } from "shared/components/CustomDataTable";
import { Post, useNewPosts } from "../utils/useNewPosts";
import { useInitDataTableColumns } from "../hooks/useInitDataTableColumns";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  VirtualScrollerLazyEvent,
  VirtualScrollerLoadingTemplateOptions,
} from "primereact/virtualscroller";
import { Skeleton } from "primereact/skeleton";

type LazyTableState = {
  first: number;
  rows: number;
  page: number;
  sortField: string;
  sortOrder: number;
  filters: DataTableFilterMeta;
};

export type MappedPost = Post & {
  status: "low" | "medium" | "high";
};

export const InitDataTableInfinit = () => {
  const [totalRecords, setTotalRecords] = useState<number>(45);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedPosts, setSelectedPosts] = useState<MappedPost[]>([]);
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 5,
    page: 0,
    sortField: "",
    sortOrder: -1,
    filters: {
      title: { value: "", matchMode: FilterMatchMode.STARTS_WITH },
      // "country.name": { value: "", matchMode: "contains" },
      body: { value: "", matchMode: "contains" },
    },
  });
  const [lockedCustomers, setLockedCustomers] = useState<Post[]>([
    // {
    //   id: 10,
    //   title: "title 11111111111111111",
    //   body: "description 11111111111111",
    //   userId: 1000,
    // },
  ]);

  const { data: postsData, isLoading } = useNewPosts({
    searchValue: (lazyState.filters.title as any)?.value ?? "",
    active: true,
    limit: lazyState.rows,
    start: lazyState.page,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    console.log(
      "5555555555555555555555555555555555555555555 postsData=",
      postsData
    );
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData, setPosts]);

  const mappedPosts: MappedPost[] = useMemo(
    () =>
      (posts ?? []).map((post) => ({
        ...post,
        status:
          post.title.split("").length > 20
            ? "high"
            : post.title.split("").length > 10
            ? "medium"
            : "low",
      })),
    [posts]
  );

  const toggleLock = (data: Post, frozen: boolean, index: number) => {
    let _lockedCustomers, _unlockedCustomers;

    if (frozen) {
      _lockedCustomers = lockedCustomers.filter((c, i) => i !== index);
      _unlockedCustomers = [...posts, data];
    } else {
      _unlockedCustomers = posts.filter((c, i) => i !== index);
      _lockedCustomers = [...lockedCustomers, data];
    }

    _unlockedCustomers.sort((val1, val2) => {
      return val1.id < val2.id ? -1 : 1;
    });

    setLockedCustomers(_lockedCustomers);
    setPosts(_unlockedCustomers);
  };

  const columns = useInitDataTableColumns({ lockedCustomers, toggleLock });

  // useEffect(() => {
  //     loadLazyData();
  // }, [lazyState]);

  // const loadLazyData = () => {
  //     setLoading(true);

  //     if (networkTimeout) {
  //         clearTimeout(networkTimeout);
  //     }

  //     //imitate delay of a backend call
  //     networkTimeout = setTimeout(() => {
  //         CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
  //             setTotalRecords(data.totalRecords);
  //             setCustomers(data.customers);
  //             setLoading(false);
  //         });
  //     }, Math.random() * 1000 + 250);
  // };

  const onPage = (event: any) => {
    // DataTablePageEvent
    setlazyState(event);
  };

  const onSort = (event: any) => {
    // DataTableSortEvent
    setlazyState(event);
  };

  const onFilter = (event: any) => {
    // DataTableFilterEvent
    event["first"] = 0;
    setlazyState(event);
  };

  const onSelectionChange = (event: any) => {
    const value = event.value;

    setSelectedPosts(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event: any) => {
    const selectAll = event.checked;
    if (selectAll) {
      if (mappedPosts.length > 0) {
        setSelectAll(true);
        setSelectedPosts(mappedPosts);
      } else {
        setSelectAll(false);
        setSelectedPosts([]);
      }
    } else {
      setSelectAll(false);
      setSelectedPosts([]);
    }
    // if (selectAll) {
    //     CustomerService.getCustomers().then((data) => {
    //         setSelectAll(true);
    //         setSelectedCustomers(data.customers);
    //     });
    // } else {
    //     setSelectAll(false);
    //     setSelectedCustomers([]);
    // }
  };

  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const loadLazyTimeout: any = null;

  const loadCarsLazy = (event: VirtualScrollerLazyEvent) => {
    setlazyState((p) => ({
      ...p,
      first: event.first as number,
      page: event.first as number,
    }));
    // !lazyLoading && setLazyLoading(true);

    // if (loadLazyTimeout) {
    //     clearTimeout(loadLazyTimeout);
    // }

    // //simulate remote connection with a timeout
    // loadLazyTimeout = setTimeout(() => {
    //     let _virtualCars = [...virtualCars];
    //     let { first, last } = event;

    //     //load data of required page
    //     const loadedCars = cars.slice(first, last);

    //     //populate page of virtual cars
    //     Array.prototype.splice.apply(_virtualCars, [...[first, last - first], ...loadedCars]);

    //     setVirtualCars(_virtualCars);
    //     setLazyLoading(false);
    // }, Math.random() * 1000 + 250);
  };

  const loadingTemplate = (options: VirtualScrollerLoadingTemplateOptions) => {
    return (
      <div
        className="flex align-items-center"
        style={{ height: "17px", flexGrow: "1", overflow: "hidden" }}
      >
        dddd
        {/* <Skeleton width={options.cellEven ? (options.field === 'year' ? '30%' : '40%') : '60%'} height="1rem" /> */}
      </div>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          "& .p-datatable-table": {
            thead: {
              th: {
                backgroundColor: "#eeeeee",
                color: "primary.light",
                "& path": {
                  color: "secondary.main",
                },
              },
            },
          },
        }}
      >
        <CustomDataTable
          // frozenValue={lockedCustomers}
          value={mappedPosts}
          columns={columns}
          dataKey="id"
          // selectionMode="checkbox"
          filterDisplay="menu"
          // responsiveLayout="scroll"
          globalFilterFields={["title", "body"]}
          // lazy
          virtualScrollerOptions={{
            lazy: true,
            onLazyLoad: loadCarsLazy,
            itemSize: 46,
            delay: 200,
            showLoader: true,
            loading: isLoading,
            loadingTemplate,
          }}
          // paginator
          // first={lazyState.first}
          // rows={lazyState.rows}
          // totalRecords={totalRecords}
          // onPage={onPage}
          onSort={onSort}
          sortField={lazyState.sortField}
          sortOrder={lazyState.sortOrder as SortOrder}
          onFilter={onFilter}
          filters={{
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { value: null, matchMode: FilterMatchMode.CONTAINS },
          }}
          // loading={isLoading}
          tableStyle={{ minWidth: "75rem" }}
          selection={selectedPosts}
          onSelectionChange={onSelectionChange}
          selectAll={selectAll}
          onSelectAllChange={onSelectAllChange}
        >
          {columns}
        </CustomDataTable>
      </Box>
    </Box>
  );
};
