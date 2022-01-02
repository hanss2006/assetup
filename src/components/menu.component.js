import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import EventBus from "../common/EventBus";
import {logout} from "../actions/auth";

class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        const currentUser = this.props.user;
/*
        const showModeratorBoard = (this.props.user)? this.props.user.roles.includes("ROLE_MODERATOR") : false;
        const showAdminBoard =  (this.props.user)? this.props.user.roles.includes("ROLE_ADMIN") : false;
*/
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Assetup
                </Link>
                <div className="navbar-nav mr-auto">
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/assets"} className="nav-link">
                                Assets
                            </Link>
                        </li>
                    )}
                {/*
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
*/}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                                LogOut
                            </Link>
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
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {user};
}

export default connect(mapStateToProps)(MenuComponent);