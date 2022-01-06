import React, {Component} from "react";

class Asset extends Component {
    render() {
        return (
            <div>
                Asset
            </div>
        );
    }
}
export default Asset;
/*
const mapStateToProps = (state) => {
    return {
        assetObject: state.asset,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveAsset: (asset) => dispatch(saveAsset(asset)),
        fetchAsset: (assetId) => dispatch(fetchAsset(assetId)),
        updateAsset: (asset) => dispatch(updateAsset(asset)),
        fetchAssets: () => dispatch(fetchAssets())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Asset);*/
