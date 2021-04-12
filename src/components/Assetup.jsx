import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListComponent from "./ListComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent  from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import AssetComponent from "./AssetComponent";

class Assetup extends Component {
    render() {
        return (
            <div>
                <Router basename={process.env.PUBLIC_URL}>
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/assets/:id" component={AssetComponent}/>
                        <AuthenticatedRoute path="/assets" component={ListComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

export default Assetup
