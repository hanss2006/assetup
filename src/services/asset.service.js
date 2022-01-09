import axios from "axios";
import {JPA_API_URL} from "../Constants";
import authHeader from "./auth-header";

const retrieveCandles = (ticker, startDate, endDate) => {
    return axios.get(`${JPA_API_URL}/proxy/${ticker}?startDate=${startDate}&endDate=${endDate}`);
};

const retrieveAllCurrency = () => {
    return axios.get(`${JPA_API_URL}/currencies`, { headers: authHeader() });
};

const retrieveAllAssets = () => {
    return axios.get(`${JPA_API_URL}/assets`, { headers: authHeader() });
};

const retrieveAsset = id => {
    return axios.get(`${JPA_API_URL}/assets/${id}`, { headers: authHeader() });
};

const deleteAsset = id => {
    return axios.delete(`${JPA_API_URL}/assets/${id}`, { headers: authHeader() });
};

const updateAsset = (id, asset) => {
    return axios.put(`${JPA_API_URL}/assets/${id}`, asset, { headers: authHeader() });
};

const createAsset = asset => {
    return axios.post(`${JPA_API_URL}/assets/`, asset, { headers: authHeader() });
};

const AssetService = {
    retrieveCandles,
    retrieveAllCurrency,
    retrieveAllAssets,
    retrieveAsset,
    deleteAsset,
    updateAsset,
    createAsset
};

export default AssetService;