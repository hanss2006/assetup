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
            description: '',
            purchaseDate: moment(new Date()).format('YYYY-MM-YY'),
            price: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }
        let username = AuthenticationService.getLoggedInUserName();
        DataService.retrieveAsset(username, this.state.id)
            .then(response => this.setState(
                {
                    description: response.data.description,
                    purchaseDate: moment(response.data.purchaseDate).format('YYYY-MM-DD'),
                    price: response.data.price
                }
            ));
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a description';
        }
        if(!moment(values.purchaseDate).isValid()){
            errors.purchaseDate = 'Enter a valid target date';
        }
        return errors;
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedInUserName();
        let asset = {
            id: this.state.id,
            description: values.description,
            purchaseDate: values.purchaseDate,
            price: values.price
        }

        if (this.state.id === -1) {
            DataService.createAsset(username, asset)
                .then(() => this.props.history.push('/assets'));
        } else {
            DataService.updateAsset(username, this.state.id, asset)
                .then(() => this.props.history.push('/assets'));
        }
    }

    render() {
        let {description, purchaseDate, price} = this.state;
        return (
            <div>
                <h1>Asset</h1>
                <div className='container'>
                    <Formik
                        initialValues={{description, purchaseDate, price}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="purchaseDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field className="form-control" type="date" name="purchaseDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Calories</label>
                                        <Field className="form-control" type="text" name="price"/>
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

export default AssetComponent
