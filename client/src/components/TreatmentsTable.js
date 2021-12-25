import React, { useEffect, useState } from "react";
import {
  faEdit,
  faTrash,
  faSave,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Form, Input, DatePicker, Button } from "antd";
import { getLocaleDateTime } from "../utils";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "date" ? <DatePicker showTime /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : inputType === "date" ? (
        getLocaleDateTime(new Date(record.date))
      ) : (
        children
      )}
    </td>
  );
};

function TreatmentsTable({
  className,
  treatments,
  onUpdateTreatment,
  onDeleteTreatment,
}) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([...treatments]);
  useEffect(() => {
    setData([...treatments]);
  }, [treatments]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      await onUpdateTreatment(key, row);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Treatment Number",
      dataIndex: "treatment_number",
      key: "treatment_number",
      sorter: (a, b) => a.treatment_number - b.treatment_number,
    },
    {
      title: "Treatment Information",
      dataIndex: "treatment_information",
      key: "treatment_information",
      editable: true,
      sorter: (a, b) => a.treatment_information - b.treatment_information,
    },
    {
      title: "Treatment Date",
      dataIndex: "date",
      key: "date",
      editable: true,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Worker Email",
      dataIndex: "worker_email",
      key: "worker_email",
      editable: true,
      sorter: (a, b) => a.worker_email - b.worker_email,
    },
    {
      title: "Car Number",
      dataIndex: "car_number",
      key: "car_number",
      editable: true,
      sorter: (a, b) => a.car_number - b.car_number,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div className="table-actions">
          {isEditing(record) ? (
            <>
              <Button
                className="table-action-button"
                onClick={() => {
                  save(record.key);
                }}
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
              <Button className="table-action-button" onClick={cancel}>
                <FontAwesomeIcon icon={faBan} />
              </Button>
            </>
          ) : (
            <>
              <Button
                className="table-action-button"
                disabled={editingKey !== ""}
                onClick={() => {
                  edit(record);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                className="table-action-button"
                disabled={editingKey !== ""}
                onClick={() => onDeleteTreatment(record.key)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === "date" ? "date" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });
  return (
    <div className={className}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={data}
          scroll={{ y: 400, x: 500 }}
          pagination={{ pageSize: 10 }}
        />
      </Form>
    </div>
  );
}

export default TreatmentsTable;
