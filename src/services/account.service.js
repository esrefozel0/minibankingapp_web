import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/accounts";


const createAccount = (name) => {
  const currentUser = AuthService.getCurrentUser();

  return axios.post(API_URL, {
    name
  },
  {headers: {'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${currentUser.token}`}})
  .then((response) => {
    return response;
  });
};

const getAccounts = (name, number) => {
  const currentUser = AuthService.getCurrentUser();
  return axios.get(API_URL+"?name="+name+"&number="+number,
  {headers: {'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${currentUser.token}`}} )
  .then((response) => {
    console.log(response.data)
    return response.data;
  });
};

const deleteAccount = (id) => {
  const currentUser = AuthService.getCurrentUser();
  return axios.delete(API_URL+"/"+id,
  {headers: {
  'Authorization' : `Bearer ${currentUser.token}`}})
  .then((response) => {
    console.log(response.data)
    return response.data;
  });
};

const updateAccount = (id, name) => {
  const currentUser = AuthService.getCurrentUser();
  return axios.put(API_URL+"/"+id,{name},
  {headers: {
  'Authorization' : `Bearer ${currentUser.token}`}})
  .then((response) => {
    console.log(response.data)
    return response.data;
  });
};

const AccountService = {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount
}

export default AccountService;
