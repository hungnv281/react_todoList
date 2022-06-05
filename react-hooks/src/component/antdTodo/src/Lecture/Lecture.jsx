import { Button, Modal, Table, Form, Input, Popconfirm, Space } from "antd";
import React, { useCallback, useMemo, useState, useRef } from "react";
import Highlighter from "react-highlight-words";

// import FormStudent from "./FormStudent";
import { SearchOutlined } from "@ant-design/icons";

import { InfoCircleOutlined } from "@ant-design/icons";
import NullData from "../../NullData";
// import "../../../style/antdTodoStyle/ListStudent.scss";
import "../../../../style/antdTodoStyle/ListStudent.scss";
const ListLecture = (props) => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const {
    addLecture,
    isOpenModal,
    updateLecture,
    handleCancel,
    deleteLecture,
    handleOk,
    // listLecture,
  } = props;
  // const handleAddStudent = ()
  const showLectureEdit = useCallback(
    (record) => {
      handleOk();
      form.setFieldsValue({
        // key: record.key,
        name: record.name,
        dateOfBirth: record.dateOfBirth,
        address: record.address,
        // description: record.description,
        phoneNumber: record.phoneNumber,
        gender: record.gender,
      });
      setId(record.id);
    },
    [form, handleOk]
  );

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 30,
      sorter: (a, b) => a.name.length - b.name.length,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      ...getColumnSearchProps("name"),
    },
    {
      title: "DateOfBirth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      // fixed: "left",
      width: 50,
      ...getColumnSearchProps("dateOfBirth"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      // fixed: "left",
      width: 30,
      ...getColumnSearchProps("address"),
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      width: 60,
      key: "phoneNumber",
      // fixed: "left",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 50,
      key: "gender",
      ...getColumnSearchProps("gender"),

      // fixed: "left",
    },
    //   {
    //     title: "Gender",
    //     dataIndex: "gender",
    //     key: "gender",
    //     // fixed: "left",
    //     width: 50,
    //     // maxWidth: 50,
    //   },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
      fixed: "right",
      render: (_, record) => (
        // <p>hello</p>
        <div>
          <Button
            type="primary"
            style={{ width: 60, marginRight: 10 }}
            onClick={() => {
              showLectureEdit(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="are you sure ?"
            okText="yes"
            cancelText="no"
            onConfirm={() => deleteLecture(record)}
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
  ];
  // [deleteLecture, showLectureEdit]
  // );

  const onFinish = (values) => {
    if (id) {
      updateLecture(id, values);
    } else {
      addLecture(values);
    }
    form.resetFields();
  };

  return (
    <div>
      {props.listLecture?.length !== 0 ? (
        <Table
          dataSource={props.listLecture}
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
              label="dateOfBirth"
              required
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              name="dateOfBirth"
              rules={[
                {
                  // type: "number",
                  required: true,
                  message: "input a number!",
                },
              ]}
            >
              <Input placeholder="input date of birth" />
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
              label="phoneNumber"
              required
              tooltip="This is a required field"
              name="phoneNumber"
              rules={[
                {
                  message: "string is not a phone number!!",
                  // required: true,
                  type: "number",
                },
              ]}
            >
              <Input placeholder="input phone number" />
            </Form.Item>
            <Form.Item label="gender" name="gender">
              <Input placeholder="input gender" />
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

export default ListLecture;
