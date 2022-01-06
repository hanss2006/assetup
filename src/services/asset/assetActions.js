import * as AT from "./assetTypes";
import axios from "axios";
import authHeader from "../auth-header"
import {JPA_API_URL} from "../../Constants";

export const saveAsset = (asset) => {
    return (dispatch) => {
        dispatch({
            type: AT.SAVE_ASSET_REQUEST,
        });
        axios
            .post(`${JPA_API_URL}/assets`, asset, { headers: authHeader() })
            .then((response) => {
                dispatch(assetSuccess(response.data));
            })
            .catch((error) => {
                dispatch(assetFailure(error));
            });
    };
};

export const fetchAsset = (assetId) => {
    return (dispatch) => {
        dispatch({
            type: AT.FETCH_ASSET_REQUEST,
        });
        axios
            .get(`${JPA_API_URL}/assets/${assetId}`, { headers: authHeader() })
            .then((response) => {
                dispatch(assetSuccess(response.data));
            })
            .catch((error) => {
                dispatch(assetFailure(error));
            });
    };
};

export const updateAsset = (asset) => {
    return (dispatch) => {
        dispatch({
            type: AT.UPDATE_ASSET_REQUEST,
        });
        axios
            .put(`${JPA_API_URL}/assets/${asset.id}`, asset, { headers: authHeader() })
            .then((response) => {
                dispatch(assetSuccess(response.data));
            })
            .catch((error) => {
                dispatch(assetFailure(error));
            });
    };
};

export const deleteAsset = (assetId) => {
    return (dispatch) => {
        dispatch({
            type: AT.DELETE_ASSET_REQUEST,
        });
        axios
            .delete(`${JPA_API_URL}/assets/${assetId}`, { headers: authHeader() })
            .then((response) => {
                dispatch(assetSuccess(response.data));
            })
            .catch((error) => {
                dispatch(assetFailure(error));
            });
    };
};

const assetSuccess = (asset) => {
    return {
        type: AT.ASSET_SUCCESS,
        payload: asset,
    };
};

const assetFailure = (error) => {
    return {
        type: AT.ASSET_FAILURE,
        payload: error,
    };
};

export const fetchAssets = () => {
    return (dispatch) => {
        dispatch({
            type: AT.FETCH_ASSETS_REQUEST,
        });
        axios
            .get(`${JPA_API_URL}/assets`, { headers: authHeader() })
            .then((response) => {
                dispatch({
                    type: AT.ASSETS_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: AT.ASSETS_FAILURE,
                    payload: error,
                });
            });
    };
};
