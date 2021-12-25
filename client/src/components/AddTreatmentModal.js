import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";

function AddTreatmentModal({ visible, onAdd, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add a new treatment"
      okText="Add"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onAdd(values);
            onCancel();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="Treatment information"
          name="treatment_information"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Treatment date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          label="Worker email"
          name="worker_email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Car number"
          name="car_number"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTreatmentModal;
