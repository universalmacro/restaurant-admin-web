import React, { useEffect, useState, useMemo } from "react";

import tableDataDevelopment from "./variables/tableDataDevelopment";
import tableDataCheck from "./variables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import tableDataColumns from "./variables/tableDataColumns";
import tableDataComplex from "./variables/tableDataComplex";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";

import {
  SelectColumnFilter,
  DateRangeColumnFilter,
  dateBetweenFilterFn
} from "../bill/variables/filters";
import TableContainer from "../bill/variables/TableContainer";
import { restaurantApi } from "api";


const Tables = () => {
  const [tableData, setTableData] = useState([]);

  const rowData = React.useMemo(
    () => [
      {
        date: "11/23/2022 02:58:12"
      },
      {
        date: "09/29/2022 07:58:12"
      },
      {
        date: "10/13/2022 19:58:12"
      }
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn
      }
    ],
    []
  );

  const billData = async () => {
    try {
      const res = await restaurantApi.listBills({
        restaurantId: '1717358125507416064',
        // status?: BillStatus;
        // startAt?: number;
        // endAt?: number;
        // tableId?: string;
      });

      console.log(res);
      setTableData(res);
    } catch (e) {

    }
  };

  useEffect(() => {
    billData();
  }, []);

  return (

    <div>
      {/* <TableContainer columns={columns} data={rowData} />; */}
      <div className="mt-5 grid h-full grid-cols-1 gap-5">

        <ComplexTable tableData={tableData} />
      </div>
    </div>
  );
};

export default Tables;
