import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (obj, authorization) => {
  const response = await axios.post(baseUrl, obj, authorization);
  return response.data
};

const deleteBlog = async (id, authorization) => {
  const response = await axios.delete(`${baseUrl}/${id}`, authorization)
  return response.data
}

const editBlog = async (id, edit) => {
  const response = await axios.put(`${baseUrl}/${id}`, edit)
  return response.data
}


export default { getAll, addNew, deleteBlog, editBlog };
