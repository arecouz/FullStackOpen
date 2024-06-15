import axios from 'axios';
const baseUrl = '/api/blogs';

const getToken = async () => {
  const json_user = localStorage.getItem('loggedAppUser');
  const user = JSON.parse(json_user);
  return user.token;
}

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const json_user = localStorage.getItem('loggedAppUser');
  const user = JSON.parse(json_user);
  const token = user.token;

  const response = await axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, remove };
