import axios from "axios";
import authHeader from "./auth-header";
import {JPA_API_URL} from "../Constants";

const API_URL = `${JPA_API_URL}/test/`;

class UserService {
  retrieveCandles(ticker, startDate, endDate){
    return axios.get(`${JPA_API_URL}/proxy/${ticker}?startDate=${startDate}&endDate=${endDate}`);
  }

  retrieveAllCurrency(){
    return axios.get(`${JPA_API_URL}/currencies`, { headers: authHeader() });
  }

  retrieveAllAssets(){
    return axios.get(`${JPA_API_URL}/assets`, { headers: authHeader() });
  }

  retrieveAsset(id){
    return axios.get(`${JPA_API_URL}/assets/${id}`, { headers: authHeader() });
  }

  deleteAsset(id){
    return axios.delete(`${JPA_API_URL}/assets/${id}`, { headers: authHeader() });
  }

  updateAsset(id, asset){
    return axios.put(`${JPA_API_URL}/assets/${id}`, asset, { headers: authHeader() });
  }

  createAsset(asset){
    return axios.post(`${JPA_API_URL}/assets/`, asset, { headers: authHeader() });
  }



  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
