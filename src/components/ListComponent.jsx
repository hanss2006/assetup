import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import DataService from "../api/DataService";
import moment from 'moment';


class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            message: null
        }
        this.updateClicked = this.updateClicked.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addClicked = this.addClicked.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    updateClicked(id){
        this.props.history.push(`/assets/${id}`);
    }

    addClicked(){
        this.props.history.push(`/assets/-1`);
    }


    deleteClicked(id){
        let username = AuthenticationService.getLoggedInUserName();
        DataService.deleteAsset(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of asset ${id}`});
                    this.refresh();
                }
            )
    }

    refresh(){
        let username = AuthenticationService.getLoggedInUserName();
        DataService.retrieveAllAssets(username).then(
            response => {
                this.setState({assets : response.data})
            }
        )
    }

    render() {
        return (
            <>
                <h1>Assets</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table" style={{captionSide: 'top'}}>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.assets.map(
                                (asset, i) =>
                                    <tr key={asset.id}>
                                        <td>{asset.description}</td>
                                        <td>{asset.price}</td>
                                        <td>{moment(asset.purchaseDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={()=> this.updateClicked(asset.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={()=> this.deleteClicked(asset.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addClicked}>Add</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ListComponent
