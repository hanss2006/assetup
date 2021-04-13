import React, {Component} from 'react'
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import DataService from "../api/DataService";
import AuthenticationService from "./AuthenticationService";

class AssetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            ticker: '',
            description: '',
            price: 0,
            quantity: 0,
            purchaseDate: moment(new Date()).format('YYYY-MM-YY'),
            currency: 'RUB'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (+this.state.id === -1) {
            return;
        }
        let username = AuthenticationService.getLoggedInUserName();
        DataService.retrieveAsset(username, this.state.id)
            .then(response => this.setState(
                {
                    ticker: response.data.ticker,
                    description: response.data.description,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    purchaseDate: moment(response.data.purchaseDate).format('YYYY-MM-DD'),
                    currency: response.data.currency
                }
            ));
    }

    checkNumber(x) {
        if(typeof x == 'number' && !isNaN(x)){
            // check if it is integer
            if (Number.isInteger(x)) {
                return true;
            }
            else {
                return true;
            }

        } else {
            return false;
        }
    }

    validate(values) {
        let errors = {};
        if (!values.ticker) {
            errors.ticker = 'Enter a ticker';
        }
        if (!values.description) {
            errors.description = 'Enter a description';
        }
        if (!this.checkNumber(values.price)) {
            errors.price = 'Price should be a number';
        }
        if (!this.checkNumber(values.quantity)) {
            errors.price = 'Quantity should be a number';
        }
        if (!moment(values.purchaseDate).isValid()) {
            errors.purchaseDate = 'Enter a valid target date';
        }
        return errors;
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();
        let asset = {
            id: this.state.id,
            ticker: values.ticker,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            purchaseDate: values.purchaseDate,
            currency: values.currency
        }

        if (+this.state.id === -1) {
            DataService.createAsset(username, asset)
                .then(() => this.props.history.push('/assets'));
        } else {
            DataService.updateAsset(username, this.state.id, asset)
                .then(() => this.props.history.push('/assets'));
        }
    }

    render() {
        let {ticker, description, price, quantity, purchaseDate, currency} = this.state;
        return (
            <div>
                <h1>Asset</h1>
                <div className='container'>
                    <Formik
                        initialValues={{ticker, description, price, quantity, purchaseDate, currency}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="ticker" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="purchaseDate" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="price" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="quantity" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Ticker</label>
                                        <Field className="form-control" type="text" name="ticker"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field className="form-control" type="number" name="price"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Quantity</label>
                                        <Field className="form-control" type="number" name="quantity"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field className="form-control" type="date" name="purchaseDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Currency</label>
                                        <Field className="form-control" type="text" name="currency"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default AssetComponent;
