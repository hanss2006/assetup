import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import ErrorComponent from "./components/error.component";
import Menu from "./components/menu.component";
import {clearMessage} from "./actions/message";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  render() {
    return (
      <BrowserRouter basename="/assetup" location={history.location} navigator={history}>
        <div>
          <Menu/>
          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/home" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path="/profile" element={<Profile/>} />
              <Route path="/user" element={<BoardUser/>} />
              <Route path="/mod" element={<BoardModerator/>} />
              <Route path="/admin" element={<BoardAdmin/>} />
              <Route path="*" element={<ErrorComponent/>} />
            </Routes>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}

export default connect(mapStateToProps)(App);
