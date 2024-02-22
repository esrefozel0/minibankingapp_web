import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://localhost:8080/api/transactions/";


const transferMoney = (amount, fromAccountNumber, toAccountNumber) => {
  const currentUser = AuthService.getCurrentUser();
  return axios.post(API_URL + "transfer", {
    amount,
    fromAccountNumber,
    toAccountNumber
  },
  {headers: {'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${currentUser.token}`}})
  .then((response) => {
    return response.data;
  });
};

const getTransactions = (accountId) => {
  const currentUser = AuthService.getCurrentUser();
  return axios.get(API_URL + "account/"+accountId ,
  {headers: {'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${currentUser.token}`}})
  .then((response) => {
    console.log(response.data)
    return response.data;
  });
};


const TransactionService = {
  transferMoney,
  getTransactions
}

export default TransactionService;
