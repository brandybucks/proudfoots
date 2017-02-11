import axios from 'axios'

exports.addMessage = (data) => {
  return axios.post('/addmessage', data);
};

exports.getAllMessage = () => {
  return axios.get('/getallmessage')
}
