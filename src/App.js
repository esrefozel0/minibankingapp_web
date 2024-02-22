import React, { useState, useEffect } from "react";
import { Routes, Route, Link , Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { setUser, setToken} from "./stores/auth";
import {useDispatch,useSelector} from "react-redux";

import EventBus from "./common/EventBus";

const App = () => {

  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const user1 = AuthService.getCurrentUser();
    if(user1) {
      dispatch(setUser(user1))
      dispatch(setToken(user1.token))
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    dispatch(setUser(null))
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Mini Banking App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

        </div>

         {user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-link">
              
                {user?.username}

            </li>
            <li className="nav-item">
              <a href="/logout" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          {user!==null && 
          <Route exact path="/home" element={<Home/>} />}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
