import axios from "axios";
import {JPA_API_URL} from "../Constants";

class DataService {
    retrieveAllAssets(name){
        return axios.get(`${JPA_API_URL}/users/${name}/assets`);
    }

    retrieveAsset(name, id){
        return axios.get(`${JPA_API_URL}/users/${name}/assets/${id}`);
    }

    deleteAsset(name, id){
        return axios.delete(`${JPA_API_URL}/users/${name}/assets/${id}`);
    }

    updateAsset(name, id, asset){
        return axios.put(`${JPA_API_URL}/users/${name}/assets/${id}`, asset);
    }

    createAsset(name, asset){
        return axios.post(`${JPA_API_URL}/users/${name}/assets/`, asset);
    }

}

export default new DataService()
