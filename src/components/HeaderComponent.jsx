import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
    logoutClick = () => {
        this.props.updateUserName('');
        AuthenticationService.logout();
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{this.props.userName ? this.props.userName : 'Assetup'}</Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                {isUserLoggedIn &&
                                    <Link className="nav-link active" to="/assets">Assets</Link>}
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {!isUserLoggedIn &&
                                <Link className="nav-link" to="/login">Login</Link>}
                                {isUserLoggedIn &&
                                <Link className="nav-link" to="/logout" onClick={this.logoutClick}>Logout</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default HeaderComponent
