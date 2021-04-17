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
            <nav className="h-menu">
                <ul>
                    <li>
                        <Link className="navbar-brand"
                              to="/">{this.props.userName ? this.props.userName : 'Assetup'}</Link>
                    </li>
                    <li>
                        {isUserLoggedIn &&
                        <Link className="nav-link" to="/assets">Активы</Link>}
                    </li>
                    <li className="right-nav">
                        {!isUserLoggedIn &&
                        <Link className="nav-link" to="/login">Вход</Link>}
                        {isUserLoggedIn &&
                        <Link className="nav-link" to="/logout" onClick={this.logoutClick}>Выход</Link>}
                    </li>
                </ul>
            </nav>
        )
    }
}

export default HeaderComponent
