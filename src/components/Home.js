import React, { useState, useRef , useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Modal from"../components/Modal";
import Transaction from"../components/Transaction";
import Account from"../components/Account";
import {useDispatch, useSelector } from 'react-redux'
import {
  setAccountList,
  setTransactionList
} from '../stores/counter'
import AccountService from "../services/account.service";
import TransactionService from "../services/transaction.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Home = () => {
  const form = useRef();
  const checkBtn = useRef();
  const checkBtn2 = useRef();

  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)
  const [item, setItem] = useState('')
  const [updatedName, setUpdatedName] = useState("");
  const [accountNumberFrom, setAccountNumerFrom] = useState("");
  const [accountNumberTo, setAccountNumerTo] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [selectedTransactionAccountNumber, setSelectedTransactionAccountNumber] = useState("");

  const dispatch = useDispatch() 
  const {account} = useSelector(state=>state.counter)

  const handleDeleteAccount = () => {
    AccountService.deleteAccount(account.id).then(()=>{
      getAccounts();}
    )
    closeModal();
  }

  const handleUpdateAccount = () => {
    AccountService.updateAccount(account.id, updatedName)
    item.name= updatedName;
  }

  const onChangeUpdatedName = (e) => {
    setUpdatedName(e.target.value);
  };


  const openModal = (item) => {
    setItem(item)
    setIsModalOpen(true);
   };


  const openTransaction = (id, number) => {
    TransactionService.getTransactions(id).then(
      (value) => {
        dispatch(setTransactionList(value))
      },);
    setIsTransactionOpen(true);
    setSelectedTransactionAccountNumber(number)
   };

   const closeModal = () => {
    setIsModalOpen(false);
   };

  const onChangeAccountName = (e) => {
    const accountName = e.target.value;
    setAccountName(accountName);
  };

  const onChangeAccountNumberFrom= (e) => {
    const accountNumber = e.target.value;
    setAccountNumerFrom(accountNumber);
  };

  const onChangeAccountNumberTo= (e) => {
    const accountNumber = e.target.value;
    setAccountNumerTo(accountNumber);
  };

  const onChangeAmount= (e) => {
    const amount = e.target.value;
    setTransferAmount(amount);
  };
  const onChangeFilterName = (e) => {
    const filter = e.target.value;
    setFilterName(filter);
  };

  const onChangeFilterNumber = (e) => {
    const filter = e.target.value;
    setFilterNumber(filter);
  };

  useEffect(()=>{
    getAccounts();
  },[filterName, filterNumber]);

  const getAccounts= ()=>{
    AccountService.getAccounts(filterName,filterNumber).then(
      (value) => {
        dispatch(setAccountList(value))
      },)
  }

  useEffect(()=>{
    getAccounts();
  },[]);

  const handleMoneyTransfer = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (checkBtn.current.context._errors.length === 0) {
      TransactionService.transferMoney(transferAmount, accountNumberFrom, accountNumberTo).then(
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        },
      getAccounts()
      );
    } else {
      setLoading(false);
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (checkBtn.current.context._errors.length === 0) {
      AccountService.createAccount(accountName).then(
        (value)=>{
          getAccounts();
          setLoading(false);

        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
  
        },   

      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="form-wrapper">
      <div className="card card-container">
        <h2>Create Account</h2>
        <Form onSubmit={handleCreateAccount} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Account Name</label>
            <Input
              type="text"
              className="form-control"
              name="accountName"
              value={accountName}
              onChange={onChangeAccountName}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Crete Account</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <div className="card card-container">
      <h2>Transfer Money</h2>
        <Form onSubmit={handleMoneyTransfer} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Account Number From</label>
            <Input
              type="text"
              className="form-control"
              name="accountNumberFrom"
              value={accountNumberFrom}
              onChange={onChangeAccountNumberFrom}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Account Number To</label>
            <Input
              type="text"
              className="form-control"
              name="accountNumberTo"
              value={accountNumberTo}
              onChange={onChangeAccountNumberTo}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Amount</label>
            <Input
              type="text"
              className="form-control"
              name="amount"
              value={transferAmount}
              onChange={onChangeAmount}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Transfer</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn2} />
        </Form>
      </div>
      </div>

      <h2>Accounts</h2>

      <input
        type="text"
        value={filterName}
        onChange={onChangeFilterName}
        placeholder="Filter Name"
      />
      <input
        type="text"
        value={filterNumber}
        onChange={onChangeFilterNumber}
        placeholder="Filter Number"
      />
      <br/><br/>

    <Account openModal={openModal} openTransaction={openTransaction}></Account>

      <br/>
      <hr/>
      <br/>
    <Transaction selectedTransactionAccountNumber={selectedTransactionAccountNumber} isTransactionOpen={isTransactionOpen}></Transaction>
        <br/>
        <br/>
        <br/>
        <br/>
    <Modal item={item} isModalOpen={isModalOpen} closeModal={closeModal} handleUpdateAccount={handleUpdateAccount} handleDeleteAccount={handleDeleteAccount} onChangeUpdatedName={onChangeUpdatedName}></Modal>
    </div>
    
  );
};

export default Home;
