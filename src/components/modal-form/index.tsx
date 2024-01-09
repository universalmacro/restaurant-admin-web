import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import { Button, Modal, Form, Input, Radio } from 'antd';
import axios from "axios";

const ModalForm = ({ state, visible, onSave, onCancel }: any) => {

  const [form] = Form.useForm();

  form.setFieldsValue({
    title: state.label,
  })

  return (
    <Modal
      open={visible}
      title="新增餐桌"
      okText="確認"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSave(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="label"
          label="餐桌名稱"
          rules={[
            {
              required: true,
              message: '請輸入餐廳名稱',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;