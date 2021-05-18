import axios from "axios";
import {JPA_API_URL} from "../Constants";

class DataService {

    retrieveCandles(ticker, startDate, endDate){
        return axios.get(`${JPA_API_URL}/proxy/${ticker}/${startDate}/${endDate}`);
    }

    retrieveAllCurrency(){
        return axios.get(`${JPA_API_URL}/currencies`);
    }

    retrieveAllAssets(){
        return axios.get(`${JPA_API_URL}/assets`);
    }

    retrieveAsset(id){
        return axios.get(`${JPA_API_URL}/assets/${id}`);
    }

    deleteAsset(id){
        return axios.delete(`${JPA_API_URL}/assets/${id}`);
    }

    updateAsset(id, asset){
        return axios.put(`${JPA_API_URL}/assets/${id}`, asset);
    }

    createAsset(asset){
        return axios.post(`${JPA_API_URL}/assets/`, asset);
    }

}

export default new DataService()
