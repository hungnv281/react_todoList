import { Select } from "antd";
// import { Option } from "antd/lib/mentions";
// import useItems from "antd/lib/menu/hooks/useItems";
import React, { useState } from "react";
import "./App.less";
import Student from "./component/antdTodo";
const { Option } = Select;

const App = () => {
  // const abc = () => (
  const [value, setValue] = useState("");
  const persons = ["Student", "Lecture"];

  const handleChangeSelect = (value) => {
    setValue(value);
  };
  // )
  return (
    <div className="App">
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        style={{
          width: 120,
          marginLeft: "10%",
          marginBottom: 20,
          marginTop: 20,
        }}
        // onChange
        // value={value}
        onChange={handleChangeSelect}
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        // showArrow={true}
      >
        {persons.map((person, index) => (
          <Option value={person.toLowerCase()} key={index}>
            {`${person}`}
          </Option>
        ))}
      </Select>
      <Student value={value} />
    </div>
  );
};

export default App;
