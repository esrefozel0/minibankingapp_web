import React from "react";
import "../components/Modal.css";

import {useSelector} from "react-redux";

import { IoMdClose } from "react-icons/io";


const Modal = (props) => {

  const {account} = useSelector(state=>state.counter)

  return (
    <div className="col-md-12">
        {props.isModalOpen && (
          <section className="modal">
          <article className="modal-content p-lg-4">
            <div className="exit-icon text-end">
              <IoMdClose onClick={props.closeModal} />
            </div>
            <main className="modal-mainContents">
              <h5 className="modal-title">Account Details</h5>
              <hr />
              {account !== undefined&&
              <table>
                <tbody>
                <tr>
                  <td>Name</td>
                  <td><input defaultValue={account.name} onChange={props.onChangeUpdatedName}></input></td>
                </tr>
                <tr>
                  <td>Number</td>
                  <td>{account.number}</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  <td>{account.balance}</td>
                </tr>
                <tr>
                <td>
                    <button onClick={props.handleDeleteAccount}>Delete</button>
                    <button onClick={props.handleUpdateAccount}>Update</button>
                  </td>
                </tr>
                  
                </tbody>
                </table>}
            </main>
          </article>
        </section>)}
    </div>
  );
};

export default Modal;
