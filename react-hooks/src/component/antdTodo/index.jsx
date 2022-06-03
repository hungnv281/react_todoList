import { Button, Layout, message } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
// import "../../../style/antdTodoStyle/style.scss";
import "../../style/antdTodoStyle/style.scss";
import ListStudent from "./src/Student/ListStudent";
import ListLecture from "./src/Lecture/Lecture";
import { addItem, updateItem, getAllItem, deleteItemByKey } from "./until";
import { Spin } from "antd";
// import loading from "../../images/loading.svg";
// const API = "";

const Student = (props) => {
  const { value } = props;
  const [listStudent, setListStudent] = useState();
  const [isVisitableForm, setIsVisitableForm] = useState(false);
  const [loader, setLoader] = useState(true);
  const [API, setAPI] = useState(
    "https://6281adf5ed9edf7bd8772a9e.mockapi.io/api/v1/student/"
  );
  const studentAPI =
    "https://6281adf5ed9edf7bd8772a9e.mockapi.io/api/v1/student/";
  const lectureAPI =
    "https://6281adf5ed9edf7bd8772a9e.mockapi.io/api/v1/lecture/";

  useEffect(() => {
    setAPI(value === "student" ? studentAPI : lectureAPI);
  }, [API, value]);

  useEffect(() => {
    setLoader(true);
    getAllItem(API)
      .then((res) => {
        setLoader(false);
        const persons = res.data;
        setListStudent(persons);
      })
      .catch((error) => console.log(error));
  }, [API]);
  // };
  // Abc();

  function handleOk() {
    setIsVisitableForm(!isVisitableForm);
  }

  function handleCancel() {
    setIsVisitableForm(!isVisitableForm);
  }

  const addStudentt = (student) => {
    setLoader(true);
    addItem(API, student)
      .then((res) => {
        setLoader(false);
        const newListStudent = [...listStudent, res.data];
        setListStudent(newListStudent);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsVisitableForm(!isVisitableForm);
    message.success("success");
  };

  const deleteStudent = (student) => {
    setLoader(true);
    deleteItemByKey(API, student)
      .then((res) => {
        setLoader(false);
        const index = listStudent.findIndex((item) => item.id === res.data.id);
        const newListStudent = [...listStudent];
        newListStudent.splice(index, 1);
        setListStudent(newListStudent);
        message.success("success");
      })
      .catch((error) => {
        console.log(error);
      });

    // const index = listStudent.findIndex((item) => item.id === student.id);
    // const newListStudent = [...listStudent];
    // newListStudent.splice(index, 1  );
    // setListStudent(newListStudent);
  };

  const updateStudent = (id, student) => {
    updateItem(id, student, API);
    const index = listStudent.findIndex((item) => item.id === id);
    const newListStudent = [...listStudent];
    newListStudent.splice(index, 1, student);
    setListStudent(newListStudent);
    message.success("success");
    handleOk();
  };
  return (
    <div>
      <Spin spinning={loader}>
        <Layout hasSider>
          <Layout>
            <Content>
              {value === "student" ? (
                <ListStudent
                  listStudent={listStudent}
                  isOpenModal={isVisitableForm}
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                  addStudent={addStudentt}
                  deleteStudent={deleteStudent}
                  updateStudent={updateStudent}
                />
              ) : (
                <ListLecture
                  listLecture={listStudent}
                  isOpenModal={isVisitableForm}
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                  addLecture={addStudentt}
                  deleteLecture={deleteStudent}
                  updateLecture={updateStudent}
                />
              )}
              <Button
                className="btn_add"
                onClick={handleOk}
                type="primary"
                style={{ width: 70 }}
              >
                Add
              </Button>
            </Content>
          </Layout>

          {/* <Sider></Sider> */}
        </Layout>
      </Spin>
    </div>
  );
};

export default Student;
