import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAsset, deleteAsset } from  "../../services/asset/assetActions";
import AssetService from "../../services/asset.service";

const Asset = (props) => {
    const { pathname } = useLocation();
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);

    const initialAssetState = {
        id,
        ticker: "",
        name: "",
        description: ""
    };

    const [currentAsset, setCurrentAsset] = useState(initialAssetState);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const getAsset = id => {
        AssetService.retrieveAsset(id)
            .then(response => {
                setCurrentAsset(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAsset(currentAsset.id);
    }, [currentAsset.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentAsset({ ...currentAsset, [name]: value });
    };

    const updateContent = () => {
        dispatch(updateAsset(currentAsset.id, currentAsset))
            .then(response => {
                console.log(response);

                setMessage("The Asset was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeAsset = () => {
        dispatch(deleteAsset(currentAsset.id))
            .then(() => {
                props.history.push("/Assets");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentAsset ? (
                <div className="edit-form">
                    <h4>Asset</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="ticker">ticker</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ticker"
                                name="ticker"
                                value={currentAsset.ticker}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentAsset.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentAsset.description}
                                onChange={handleInputChange}
                            />
                        </div>


                    </form>

                    <button className="badge badge-danger" onClick={removeAsset}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Asset...</p>
                </div>
            )}
        </div>
    );
};

export default Asset;