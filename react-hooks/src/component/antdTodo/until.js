import axios from "axios";
export const addItem = (dataAPI, item) => {
  return axios.post(`${dataAPI}`, item);
  // .then((res) => {});
};

export const getAllItem = (dataAPI) => {
  return axios.get(`${dataAPI}`);
};

export const deleteItemByKey = (dataAPI, record) => {
  return axios.delete(`${dataAPI}${record.id}`);
};

export const updateItem = (id, record, dataAPI) => {
  axios.put(`${dataAPI}${id}`, { id: id, ...record });
};
