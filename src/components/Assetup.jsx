import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListComponent from "./ListComponent";
import HeaderComponent from "./HeaderComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import AssetComponent from "./AssetComponent";

class Assetup extends Component {
    state = {
        userName: ''
    };

    updateUserName = (value)=> {
        this.setState({userName: value});
    }

    render() {
        return (
            <div>
                <Router basename={process.env.PUBLIC_URL}>
                    <HeaderComponent userName={this.state.userName} updateUserName={this.updateUserName}/>
                    <Switch>
                        <Route exact path="/"
                               render={(props) => (<LoginComponent {...props} updateUserName={this.updateUserName}/>)}/>
                        <Route path="/index.html"
                               render={(props) => (<LoginComponent {...props} updateUserName={this.updateUserName}/>)}/>
                        <Route path="/login"
                               render={(props) => (<LoginComponent {...props} updateUserName={this.updateUserName}/>)}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/assets/:id" component={AssetComponent}/>
                        <AuthenticatedRoute path="/assets" component={ListComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Assetup
