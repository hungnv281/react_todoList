import { Button, Modal, Table, Form, Input, Popconfirm } from "antd";
import React, { useCallback, useMemo, useState } from "react";
// import FormStudent from "./FormStudent";
import { InfoCircleOutlined } from "@ant-design/icons";
import NullData from "../../NullData";
// import "../../../style/antdTodoStyle/ListStudent.scss";
import "../../../../style/antdTodoStyle/ListStudent.scss";
const ListStudent = (props) => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const {
    addStudent,
    isOpenModal,
    updateStudent,
    handleCancel,
    deleteStudent,
    handleOk,
  } = props;
  // const handleAddStudent = ()
  const showStudentEdit = useCallback(
    (record) => {
      console.log(record.key, "   record   ", record);
      handleOk();
      form.setFieldsValue({
        // key: record.key,
        name: record.name,
        age: record.age,
        address: record.address,
        description: record.description,
        email: record.email,
        gender: record.gender,
      });
      setId(record.id);
    },
    [form, handleOk]
  );

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        fixed: "left",
        width: 50,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        // fixed: "left",
        width: 30,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        // fixed: "left",
        width: 50,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 50,
        key: "email",
        // fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: 100,
        key: "description",
        // fixed: "left",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        // fixed: "left",
        width: 50,
        // maxWidth: 50,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        fixed: "right",
        render: (_, record) => (
          // <p>hello</p>
          <div>
            <Button
              type="primary"
              style={{ width: 60, marginRight: 10 }}
              onClick={() => {
                showStudentEdit(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="are you sure ?"
              okText="yes"
              cancelText="no"
              onConfirm={() => deleteStudent(record)}
            >
              <Button danger type="primary" style={{ width: 70 }}>
                Delete
              </Button>
            </Popconfirm>
          </div>

          //   <Space size="middle">
          //     <button>Invite {record.name}</a>
          //     <a>Delete</a>
          //   </Space>
        ),
      },
    ],
    [deleteStudent, showStudentEdit]
  );

  const onFinish = (values) => {
    if (id) {
      updateStudent(id, values);
    } else {
      addStudent(values);
    }
    form.resetFields();
  };

  return (
    <div>
      {props.listStudent?.length !== 0 ? (
        <Table
          dataSource={props.listStudent}
          columns={columns}
          bordered
          // scroll={{ x: 1000, y: 50000 }}
          // className="hahaha"
          size="middle"
          scroll={
            {
              // x: "calc(700px + 50%)",
              // y: 240,
            }
          }
          pagination={{ defaultCurrent: 1, pageSize: 5, showSizeChanger: true }}
        />
      ) : (
        <NullData handleOk={handleOk} />
      )}
      {isOpenModal && (
        <Modal
          title="Basic Modal"
          visible
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="name"
              required
              tooltip="This is a required field"
              name="name"
              rules={[
                {
                  required: true,
                  max: 100,
                  min: 2,
                  message: "length must be between 2 and 100",
                },
              ]}
              // validateFirst=""
            >
              <Input placeholder="input name" />
            </Form.Item>
            <Form.Item
              label="age"
              required
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              name="age"
              rules={[
                {
                  // type: "number",
                  required: true,
                  message: "input a number!",
                },
              ]}
            >
              <Input placeholder="input age" />
            </Form.Item>
            <Form.Item
              label="gender"
              required
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              name="gender"
            >
              <Input placeholder="input age" />
            </Form.Item>
            <Form.Item
              label="address"
              required
              tooltip="This is a required field"
              name="address"
              rules={[
                {
                  required: true,
                  message: "required!!!",
                },
              ]}
            >
              <Input placeholder="input address" />
            </Form.Item>
            <Form.Item
              label="email"
              required
              tooltip="This is a required field"
              name="email"
              rules={[
                {
                  message: "string is not a email!!",
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input placeholder="input address" />
            </Form.Item>
            <Form.Item label="description" name="description">
              <Input placeholder="input description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleOk}>
                cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ListStudent;
