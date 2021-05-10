import React, {Component} from 'react'
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import DataService from "../api/DataService";

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
            currency_id: 8,
            currencies: []
        }
        this.currencies = DataService.retrieveAllCurrency();

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        DataService.retrieveAllCurrency()
            .then(response => {
                this.setState(
                    {
                        currencies: response.data
                    }
                );
            });
        if (+this.state.id === -1) {
            return;
        }
        DataService.retrieveAsset(this.state.id)
            .then(response => {
                this.setState(
                    {
                        ticker: response.data.ticker,
                        description: response.data.description,
                        price: response.data.price,
                        quantity: response.data.quantity,
                        purchaseDate: moment(response.data.purchaseDate).format('YYYY-MM-DD'),
                        currency_id: response.data.currency_id
                    }
                );
            });
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
        let asset = {
            id: this.state.id,
            ticker: values.ticker,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            purchaseDate: values.purchaseDate,
            currency_id: values.currency_id
        }

        if (+this.state.id === -1) {
            DataService.createAsset(asset)
                .then(() => this.props.history.push('/assets'));
        } else {
            DataService.updateAsset(this.state.id, asset)
                .then(() => this.props.history.push('/assets'));
        }
    }

    render() {
        let {ticker, description, price, quantity, purchaseDate, currency_id, currencies} = this.state;
        return (
            <div>
                <h1>Актив</h1>
                <div className='container'>
                    <Formik
                        initialValues={{ticker, description, price, quantity, purchaseDate, currency_id, currencies}}
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
                                        <Field className="form-control" as="select" name="currency_id">
                                            {
                                                currencies.map((option)=>{
                                                    return (
                                                        <option key={option.id} value={option.id}>
                                                            {option.description}
                                                        </option>
                                                    );
                                                })
                                            }
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
