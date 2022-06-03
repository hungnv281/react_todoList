import axios from "axios";
import { useState, useMemo } from "react";

const Axios = () => {
  const [data, setData] = useState([]);
  useMemo(() => {
    axios
      .delete(
        `https://6281adf5ed9edf7bd8772a9e.mockapi.io/api/v1/student/?id=3`,
        {
          // gender: "female",
        }
      )
      .then((res) => {
        const persons = res.data;
        setData(persons);
        console.log(persons);
      })
      .catch((error) => console.log(error));
    // return remove();
  }, []);

  return (
    <ul>
      {/* {data} */}
      {data.map((person) => (
        <li>
          {person.id}, {person.name}, {person.gender}
        </li>
      ))}
    </ul>
  );
};

export default Axios;
