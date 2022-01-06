import * as AT from "./assetTypes";

const initialState = {
    asset: "",
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.SAVE_ASSET_REQUEST:
        case AT.FETCH_ASSET_REQUEST:
        case AT.UPDATE_ASSET_REQUEST:
        case AT.DELETE_ASSET_REQUEST:
        case AT.FETCH_ASSETS_REQUEST:
            return {
                ...state,
            };
        case AT.ASSET_SUCCESS:
            return {
                asset: action.payload,
                error: "",
            };
        case AT.ASSET_FAILURE:
            return {
                asset: "",
                error: action.payload,
            };
        case AT.ASSETS_SUCCESS:
            return {
                assets: action.payload,
                error: "",
            };
        case AT.ASSETS_FAILURE:
            return {
                assets: "",
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;