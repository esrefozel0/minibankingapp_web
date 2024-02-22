import React from "react";
import "../components/Modal.css";
import {useSelector , useDispatch} from "react-redux";
import { setAccount} from "../stores/counter";


const Account = (props) => {

  const dispatch = useDispatch() 

  const onClickView = (item) => {
    dispatch(setAccount(item));
    props.openModal();
  };
 
  const accountList = useSelector(state=>state.counter.accountList)

  return (
    <div className="col-md-12">
         <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accountList !== undefined && accountList.length >0 && accountList?.map(item => (
              <tr key={item.id}>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.balance}</td>
                <td>
                  <button onClick={()=>onClickView(item)}>View</button>
                  <button onClick={()=>props.openTransaction(item.id, item.number)}>Show Transactions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Account;
