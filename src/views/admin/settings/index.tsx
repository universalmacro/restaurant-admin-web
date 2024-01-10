import React, { useEffect, useState, useMemo } from "react";
import { restaurantApi, getPrinters, getDiscounts, createTable, updateTable, getRestaurant, deleteTable } from "api";
import { Table, Button, Modal, Tag, Badge, DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { toTimestamp } from "../../../utils/utils";
import { useDispatch, useSelector } from 'react-redux';
import { RiAddFill } from "react-icons/ri";
import ModalForm from "../../../components/modal-form";
import { AppDispatch } from '../../../store';
import { getRestaurantInfo } from "../../../features/restaurant/restaurantActions";


const Tables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dataSource, setDataSource] = useState([]);
  const [printerData, setPrinterData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableValue, setTableValue] = useState({ label: "", id: "" });
  const { userToken } = useSelector((state: any) => state.auth) || localStorage.getItem('userToken') || {};
  const { restaurantList, restaurantId, restaurantInfo } = useSelector((state: any) => state.restaurant) || {};
  const { confirm } = Modal;


  const getHeaders = () => {
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${userToken}`,
    };
  }

  const onSave = async (values: any) => {
    console.log(values);
    try {
      const res = await createTable(restaurantId, { label: values.label }, {
        headers: getHeaders()
      });
      dispatch(getRestaurantInfo({ token: userToken }));
    } catch (e) {

    }
    setVisible(false);
  }

  const onUpdate = async (values: any) => {
    console.log(values);
    try {
      const res = await updateTable(values.id, { label: values.label }, {
        headers: getHeaders()
      });
      dispatch(getRestaurantInfo({ token: userToken }));
    } catch (e) {

    }
    setVisible(false);
  }


  const getPrinterList = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      let params = {
        headers: getHeaders()
      }
      const res = await getPrinters(restaurantId, params);
      setPrinterData(res);
      setLoading(false);
    } catch (e) {

    }
  };

  const getDiscountList = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      let params = {
        headers: getHeaders()
      }
      const res = await getDiscounts(restaurantId, params);
      setDiscountData(res);
      setLoading(false);
    } catch (e) {

    }
  };

  const handleDeletePrinter = (record: any) => {
    console.log("handleDeletePrinter", record);
  };

  const handleDeleteTable = (record: any) => {
    showDeleteConfirm(async () => {
      console.log("onOK");
      try {
        const res = await deleteTable(record.id, {
          headers: getHeaders()
        });
        dispatch(getRestaurantInfo({ token: userToken }));

        console.log("handleDeleteTable", res);
      } catch (e) {

      }

    }


    );
  }

  const showDeleteConfirm = (onOk: any) => {
    confirm({
      title: '確認刪除？',
      // icon: <ExclamationCircleFilled />,
      // content: '確認刪除？',
      okText: '確認',
      okType: 'danger',
      cancelText: '取消',
      onOk,
      onCancel() {
        console.log('OK');
      },
    });
  };


  const addTable = () => {
    setVisible(true);
  }

  const editTable = (record: any) => {
    setTableValue({ label: record.label, id: record.id });
    setVisible(true);
  }

  useEffect(() => {
    getPrinterList();
    getDiscountList();
  }, [userToken, restaurantId]);

  const tableColums = [
    {
      title: '餐桌ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '餐桌標簽',
      dataIndex: 'label',
      key: 'label',
      width: '20%',
    },

    {
      title: '操作',
      key: 'operation',
      render: (text: any, record: any) => (<><a onClick={() => editTable(record)} className="text-blue-400 mr-4">編輯</a>
        <a className="text-red-400" onClick={() => handleDeleteTable(record)}>刪除</a></>),
    },
  ];

  const printersColums = [
    {
      title: '打印機ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: '類型',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
    },
    {
      title: '打印機 SN',
      dataIndex: 'sn',
      key: 'sn',
      width: '15%',
    },
    {
      title: '模型',
      dataIndex: 'model',
      key: 'model',
      width: '10%',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text: any, record: any) => (<><a className="text-blue-400 mr-4">編輯</a>
        <a className="text-red-400" onClick={() => handleDeletePrinter(record)}>刪除</a></>),
    },
  ];

  const discountColums = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '折扣標籤',
      dataIndex: 'label',
      key: 'label',
      width: '30%',
    },
    {
      title: '折扣',
      dataIndex: 'offset',
      key: 'offset',
      width: '10%',
    },
    {
      title: '操作',
      key: 'operation',
      render: () => (<><a className="text-blue-400 mr-4">編輯</a><a className="text-red-400">刪除</a></>),
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

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <div className="flex justify-between"><p className="text-xl mb-4 inline">餐桌列表</p> <Button onClick={addTable} icon={<RiAddFill />}>新增</Button></div>
          <Table dataSource={restaurantInfo?.tables} columns={tableColums} loading={loading} />
        </div>
        <div>
          <p className="text-xl mb-4">折扣列表</p>
          <Table dataSource={discountData} columns={discountColums} loading={loading} />
        </div>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <div>
          <p className="text-xl mb-4">打印機列表</p>
          <Table dataSource={printerData} columns={printersColums} loading={loading} />
        </div>

      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <div>
          <p className="text-xl mb-4">品項列表</p>
        </div>

      </div>

    </div>
  );
};

export default Tables;
