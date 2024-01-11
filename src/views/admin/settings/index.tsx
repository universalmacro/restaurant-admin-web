import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  restaurantApi,
  getPrinters,
  getDiscounts,
  createTable,
  updateTable,
  deleteTable,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  createPrinter,
  updatePrinter,
  deletePrinter
} from "api";
import { Table, Button, Modal, Tag } from "antd";
import { RiAddFill } from "react-icons/ri";
import ModalForm from "../../../components/modal-form";
import DiscountModalForm from "../../../components/discount-modal-form";

import { AppDispatch } from "../../../store";
import { getRestaurantInfo } from "../../../features/restaurant/restaurantActions";
import { Discount, Printer } from "types/restaurant";
import PrinterModalForm from "components/printer-modal-form";

const Tables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dataSource, setDataSource] = useState([]);
  const [printerData, setPrinterData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [visible, setVisible] = useState(false);  // table
  const [discountVisible, setDiscountVisible] = useState(false);  // discount
  const [printerVisible, setPrinterVisible] = useState(false);  // printer

  const [loading, setLoading] = useState(false);
  const [tableValue, setTableValue] = useState({ label: "", id: "" });
  const [discountValue, setDiscountValue] = useState<Discount>({ label: "", id: "", offset: 0 });
  const [printerValue, setPrinterValue] = useState<Printer>({ name: "", id: "", sn: "", description: "", type: "BILL", model: "58mm" });

  const { userToken } =
    useSelector((state: any) => state.auth) || localStorage.getItem("userToken") || {};
  const { restaurantList, restaurantId, restaurantInfo } =
    useSelector((state: any) => state.restaurant) || {};
  const { confirm } = Modal;

  const getHeaders = () => {
    return {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${userToken}`,
    };
  };

  const onSave = async (values: any) => {
    console.log(values);
    try {
      const res = await createTable(
        restaurantId,
        { label: values.label },
        {
          headers: getHeaders(),
        }
      );
      dispatch(getRestaurantInfo({ token: userToken }));
    } catch (e) { }
    setVisible(false);
  };

  const onUpdate = async (values: any) => {
    console.log(values);
    try {
      const res = await updateTable(
        values.id,
        { label: values.label },
        {
          headers: getHeaders(),
        }
      );
      dispatch(getRestaurantInfo({ token: userToken }));
    } catch (e) { }
    setVisible(false);
  };

  const onSaveDiscount = async (values: any) => {
    console.log(values);
    try {
      const res = await createDiscount(
        restaurantId,
        { label: values.label, offset: values.offset },
        {
          headers: getHeaders(),
        }
      );
      getDiscountList();

    } catch (e) { }
    setDiscountVisible(false);
  };

  const onUpdateDiscount = async (values: any) => {
    console.log(values);
    try {
      const res = await updateDiscount(
        values.id,
        { label: values.label, offset: values.offset },
        {
          headers: getHeaders(),
        }
      );
      getDiscountList();

    } catch (e) { }
    setDiscountVisible(false);
  };


  const onSavePrinter = async (values: any) => {
    console.log("onSavePrinter", values);
    try {
      const res = await createPrinter(
        restaurantId,
        values,
        {
          headers: getHeaders(),
        }
      );
      getPrinterList();

    } catch (e) { }
    setPrinterVisible(false);
  };

  const onUpdatePrinter = async (values: any) => {
    console.log(values);
    try {
      const res = await updatePrinter(
        values.id,
        values,
        {
          headers: getHeaders(),
        }
      );
      getPrinterList();

    } catch (e) { }
    setPrinterVisible(false);
  };

  const getPrinterList = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      let params = {
        headers: getHeaders(),
      };
      const res = await getPrinters(restaurantId, params);
      setPrinterData(res);
      setLoading(false);
    } catch (e) { }
  };

  const getDiscountList = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      let params = {
        headers: getHeaders(),
      };
      const res = await getDiscounts(restaurantId, params);
      setDiscountData(res);
      setLoading(false);
    } catch (e) { }
  };

  const handleDeletePrinter = (record: any) => {
    console.log("handleDeletePrinter", record);
  };

  const handleDeleteTable = (record: any) => {
    showDeleteConfirm(async () => {
      console.log("onOK");
      try {
        const res = await deleteTable(record.id, {
          headers: getHeaders(),
        });
        dispatch(getRestaurantInfo({ token: userToken }));

        console.log("handleDeleteTable", res);
      } catch (e) { }
    });
  };

  const handleDeleteDiscount = (record: any) => {
    showDeleteConfirm(async () => {
      try {
        const res = await deleteDiscount(record.id, {
          headers: getHeaders(),
        });
        getDiscountList();

        console.log("handleDeleteDiscount", res);
      } catch (e) { }
    });
  };


  const showDeleteConfirm = (onOk: any) => {
    confirm({
      title: "確認刪除？",
      // icon: <ExclamationCircleFilled />,
      // content: '確認刪除？',
      okText: "確認",
      okType: "danger",
      cancelText: "取消",
      onOk,
      onCancel() {
        console.log("OK");
      },
    });
  };

  const addTable = () => {
    setTableValue({ label: "", id: "" });
    setVisible(true);
  };

  const addDiscount = () => {
    setDiscountValue({ label: "", id: "", offset: 0 });
    setDiscountVisible(true);
  };

  const addPrinter = () => {
    setPrinterValue({ name: "", id: "", sn: "", description: "", type: "BILL", model: "58mm" });
    setPrinterVisible(true);
  };

  const editTable = (record: any) => {
    setTableValue({ label: record.label, id: record.id });
    setVisible(true);
  };

  const editDiscount = (record: any) => {
    setDiscountValue({ ...record });
    setDiscountVisible(true);
  };

  const editPrinter = (record: any) => {
    setPrinterValue({ ...record });
    setPrinterVisible(true);
  };


  useEffect(() => {
    getPrinterList();
    getDiscountList();
  }, [userToken, restaurantId]);

  const tableColums = [
    {
      title: "餐桌ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "餐桌標簽",
      dataIndex: "label",
      key: "label",
      width: "20%",
    },

    {
      title: "操作",
      key: "operation",
      render: (text: any, record: any) => (
        <>
          <a onClick={() => editTable(record)} className="mr-4 text-blue-400">
            編輯
          </a>
          <a className="text-red-400" onClick={() => handleDeleteTable(record)}>
            刪除
          </a>
        </>
      ),
    },
  ];

  const printersColums = [
    {
      title: "打印機ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名稱",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "類型",
      dataIndex: "type",
      key: "type",
      width: "15%",
    },
    {
      title: "打印機 SN",
      dataIndex: "sn",
      key: "sn",
      width: "15%",
    },
    {
      title: "模型",
      dataIndex: "model",
      key: "model",
      width: "10%",
      render: (text: string, record: any) => {
        let color = text === '58mm' ? 'green' : 'cyan';
        return (<Tag color={color} key={text}>
          {text}
        </Tag>);
      },
    },
    {
      title: "操作",
      key: "operation",
      render: (text: any, record: any) => (
        <>
          <a className="mr-4 text-blue-400" onClick={() => editPrinter(record)} >編輯</a>
          <a className="text-red-400" onClick={() => handleDeletePrinter(record)}>
            刪除
          </a>
        </>
      ),
    },
  ];

  const discountColums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "折扣標籤",
      dataIndex: "label",
      key: "label",
      width: "30%",
    },
    {
      title: "折扣",
      dataIndex: "offset",
      key: "offset",
      width: "10%",
      render: (text: number, record: any) => (
        <>
          {text}%
        </>
      ),
    },
    {
      title: "操作",
      key: "operation",
      render: (text: any, record: Discount) => (
        <>
          <a className="mr-4 text-blue-400" onClick={() => editDiscount(record)}>編輯</a>
          <a className="text-red-400" onClick={() => handleDeleteDiscount(record)}>刪除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ModalForm
        state={tableValue}
        visible={visible}
        onSave={tableValue?.label == "" ? onSave : onUpdate}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <DiscountModalForm
        state={discountValue}
        visible={discountVisible}
        onSave={discountValue?.label == "" ? onSaveDiscount : onUpdateDiscount}
        onCancel={() => {
          setDiscountVisible(false);
        }}
      />

      <PrinterModalForm
        state={printerValue}
        visible={printerVisible}
        onSave={printerValue?.id == "" ? onSavePrinter : onUpdatePrinter}
        onCancel={() => {
          setPrinterVisible(false);
        }}
      />

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <div className="flex justify-between">
            <p className="mb-4 inline text-xl">餐桌列表</p>
            <Button onClick={addTable} icon={<RiAddFill />}>
              新增
            </Button>
          </div>
          <Table dataSource={restaurantInfo?.tables} columns={tableColums} loading={loading} />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="mb-4 text-xl">折扣列表</p>
            <Button onClick={addDiscount} icon={<RiAddFill />}>
              新增
            </Button>
          </div>
          <Table dataSource={discountData} columns={discountColums} loading={loading} />
        </div>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <div>
          <div className="flex justify-between">
            <p className="mb-4 text-xl">打印機列表</p>
            <Button onClick={addPrinter} icon={<RiAddFill />}>
              新增
            </Button>
          </div>
          <Table dataSource={printerData} columns={printersColums} loading={loading} />
        </div>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <div>
          <p className="mb-4 text-xl">品項列表</p>
        </div>
      </div>
    </div>
  );
};

export default Tables;
