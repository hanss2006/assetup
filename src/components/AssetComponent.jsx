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
        if (typeof x == 'number' && !isNaN(x)) {
            // check if it is integer
            if (Number.isInteger(x)) {
                return true;
            } else {
                return true;
            }

        } else {
            return false;
        }
    }

    validate(values) {
        let errors = {};
        if (!values.ticker) {
            errors.ticker = 'Введите тикер';
        }
        if (!values.description) {
            errors.description = 'Введите описание';
        }
        if (!this.checkNumber(values.price)) {
            errors.price = 'Значение в поле цена должно быть цифровым';
        }
        if (!this.checkNumber(values.quantity)) {
            errors.price = 'Значение в поле количество должно быть цифровым';
        }
        if (!moment(values.purchaseDate).isValid()) {
            errors.purchaseDate = 'Введите значение даты';
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
                <h1>Актив</h1>
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
                                    <fieldset className="form-group row">
                                        <label>Тикер</label>
                                        <Field className="form-control" type="text" name="ticker"/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label>Описание</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label>Цена</label>
                                        <Field className="form-control" type="number" step="0.01" name="price"/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label>Количество</label>
                                        <Field className="form-control" type="number" name="quantity"/>
                                    </fieldset>

                                    <fieldset className="form-group row">
                                        <label>Дата</label>
                                        <Field className="form-control" type="date" name="purchaseDate"/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label>Валюта</label>
                                        <Field className="form-control" as="select" name="currency">
                                            <option value="RUB">Рубль</option>
                                            <option value="USD">Доллар</option>
                                            <option value="EUR">Евро</option>
                                        </Field>
                                    </fieldset>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <button className="btn btn-success" type="submit">Сохранить</button>
                                    </div>
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
