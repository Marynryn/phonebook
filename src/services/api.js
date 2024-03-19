import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

export async function fetchContacts() {
  return await axios.get('/contacts/');
}
export async function addContact(contact) {
  return await axios.post('/contacts/', contact);
}

export async function deleteContact(id) {
  return await axios.delete(`contacts/${id}`);
}
