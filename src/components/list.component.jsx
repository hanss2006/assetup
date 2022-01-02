import React, {Component} from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import moment from 'moment';


class ListComponent extends Component {
    state = {
        assets: [],
        message: null
    }

    constructor(props) {
        super(props);
        this.updateClicked = this.updateClicked.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addClicked = this.addClicked.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    updateClicked(id) {
        this.props.history.push(`/assets/${id}`);
    }

    addClicked() {
        this.props.history.push(`/assets/-1`);
    }

    id2index(id) {
        return this.state.assets.find(el => el.id === id)
    }

    deleteClicked(id) {
        const ticker = this.id2index(id).ticker;
        var answer = window.confirm(`Удалить актив ${ticker}?`);
        if (answer) {
            UserService.deleteAsset(id)
                .then(
                    response => {
                        this.setState({message: `Удален актив ${ticker}`});
                        this.refresh();
                    }
                )
        }
    }

    refresh() {
        UserService.retrieveAllAssets().then(
            response => {
                this.setState({assets: response.data})
            }
        )
    }

    render() {
        return (
            <>
                <h1>Активы</h1>
                <button className="btn btn-success big-size" onClick={this.addClicked}>Новая запись</button>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="divider"></div>
                    <table>
                        <thead>
                        <tr>
                            <th>Тикер</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Дата</th>
                            <th>Валюта</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.assets.map(
                            (asset, i) =>
                            <tr key={asset.id}>
                                <td>
                                    <Link to={`/graph/assets/${asset.id}`}>
                                        <div>
                                            {asset.ticker}
                                        </div>
                                        <div>
                                            {asset.description}
                                        </div>
                                    </Link>
                                </td>
                                <td>{asset.price}</td>
                                <td>{asset.quantity}</td>
                                <td>{moment(asset.purchaseDate).format('DD.MM.YYYY')}</td>
                                <td>{asset.currency.name}</td>
                                <td>
                                    <button title="Редактировать"
                                        onClick={(event)=> {this.updateClicked(asset.id); event.preventDefault();}}
                                        className="btn btn-success bg-font">...</button>
                                </td>
                                <td>
                                    <button title="Удалить"
                                        onClick={(event)=> {this.deleteClicked(asset.id); event.preventDefault();}}
                                        className="btn btn-warning bg-font">-</button>
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
            </>
        )
    }
}

export default ListComponent
