import React, {Component} from "react";
import {Link} from "react-router-dom";

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Добро пожаловать!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can edit list <Link to="/assets">here</Link>
                </div>
            </>
        )
    }
}

export default WelcomeComponent
