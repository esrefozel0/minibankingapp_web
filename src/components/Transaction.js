import React from "react";
import "../components/Modal.css";

import {useSelector} from "react-redux";

const Transaction = (props) => {

  const transactionList = useSelector(state=>state.counter.transactionList)

  return (
    <div className="col-md-12">
                <h2>Transaction History</h2>
        {props.isTransactionOpen && transactionList !== null && transactionList.length >0 ?
        <table className="table">
          <thead>
          <tr>
            <th>From Account Number</th>
            <th>To Account Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionList?.map(item => (
            <tr key={item.id}>
              <td>{item.fromAccountNumber}</td>
              <td>{item.toAccountNumber}</td>
              <td style={{ color: (item.fromAccountNumber === props.selectedTransactionAccountNumber ? 'red' : 'green') , fontWeight: 'bold' }}>
                {(item.fromAccountNumber === props.selectedTransactionAccountNumber ? '-' : '')+item.amount }</td>
            </tr>
          ))}
        </tbody>
        </table> : "Transaction History Not Found"}
    </div>
  );
};

export default Transaction;
