import React, {Component} from 'react'
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handlerChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked(e) {
        e.preventDefault();
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                if (this.props.updateUserName) {
                    this.props.updateUserName(this.state.username);
                }
                this.props.history.push(`/assets`);
            }).catch(() => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
        })
    }

    render() {
        return (
            <>
                <h1>Вход в программу</h1>
                <div className="container">
                    <form onSubmit={this.loginClicked}>
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Неверное имя пользователя или пароль</div>}
                        {this.state.showSuccessMessage && <div>Вход произведен</div>}
                        <div className="row">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input type="text" name="username" placeholder="Имя пользователя" value={this.state.username}
                                   onChange={this.handlerChange}/>
                        </div>
                        <div className="row">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" name="password" placeholder="Пароль"
                                   value={this.state.password}
                                   onChange={this.handlerChange}/>
                        </div>
                        <div className="divider"></div>
                        <div className="row">
                            <button type="submit" onClick={this.loginClicked} className="btn btn-success">Вход</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }


}

export default LoginComponent
