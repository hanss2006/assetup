import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAsset } from "../../services/index";
import "./../../assets/css/Style.css";
import {
    Card,
    Table,
    ButtonGroup,
    Button,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";
import authHeader from "../../services/auth-header";
import {JPA_API_URL} from "../../Constants";

class AssetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            search: "",
            currentPage: 1,
            assetsPerPage: 5,
            sortDir: "asc",
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc"
                ? this.setState({ sortDir: "desc" })
                : this.setState({ sortDir: "asc" });
            this.findAllAssets(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllAssets(this.state.currentPage);
    }

    findAllAssets(currentPage) {
        currentPage -= 1;
        axios
            .get(
                `${JPA_API_URL}/assets?page=` +
                currentPage +
                "&size=" +
                this.state.assetsPerPage +
                "&sortBy=name&sortDir=" +
                this.state.sortDir,
                { headers: authHeader() }
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    assets: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                this.props.history.push("/");
            });
    }

    deleteAsset = (assetId) => {
        this.props.deleteAsset(assetId);
        setTimeout(() => {
            if (this.props.assetObject != null) {
                this.setState({ show: true });
                setTimeout(() => this.setState({ show: false }), 3000);
                this.findAllAssets(this.state.currentPage);
            } else {
                this.setState({ show: false });
            }
        }, 1000);
    };

    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllAssets(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllAssets(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllAssets(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.assetsPerPage
        );
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllAssets(condition);
            }
        }
    };

    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.assetsPerPage)
        ) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllAssets(this.state.currentPage + 1);
            }
        }
    };

    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    cancelSearch = () => {
        this.setState({ search: "" });
        this.findAllAssets(this.state.currentPage);
    };

    searchData = (currentPage) => {
        if (isNaN(currentPage)){
            currentPage = this.state.currentPage-1;
        } else {
            currentPage -= 1;
        }
        axios
            .get(
                `${JPA_API_URL}/assets?name=` +
                this.state.search +
                "&page=" +
                currentPage +
                "&size=" +
                this.state.assetsPerPage,
                { headers: authHeader()}
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    assets: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };

    render() {
        const { assets, currentPage, totalPages, search } = this.state;

        return (
            <div>
                <div style={{ display: this.state.show ? "block" : "none" }}>
                    <MyToast
                        show={this.state.show}
                        message={"Asset Deleted Successfully."}
                        type={"danger"}
                    />
                </div>
                <Card className={"border border-light bg-light text-primary"}>
                    <Card.Header>
                        <div style={{ float: "left" }}>
                            <FontAwesomeIcon icon={faList} /> Asset List
                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup size="sm">
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    value={search}
                                    className={"info-border bg-light text-white"}
                                    onChange={this.searchChange}
                                />
                                <Button
                                    size="sm"
                                    variant="outline-info"
                                    type="button"
                                    onClick={this.searchData}
                                >
                                <FontAwesomeIcon icon={faSearch} />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                     type="button"
                                     onClick={this.cancelSearch}
                                >
                                     <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Ticker</th>
                                <th onClick={this.sortData}>
                                    Name{" "}
                                    <div
                                        className={
                                            this.state.sortDir === "asc"
                                                ? "arrow arrow-up"
                                                : "arrow arrow-down"
                                        }
                                    >
                                        {" "}
                                    </div>
                                </th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {assets.length === 0 ? (
                                <tr align="center">
                                    <td colSpan="7">No Assets Available.</td>
                                </tr>
                            ) : (
                                assets.map((asset) => (
                                    <tr key={asset.id}>
                                        <td>
                                            {asset.ticker}
                                        </td>
                                        <td>{asset.name}</td>
                                        <td>{asset.description}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    to={"edit/" + asset.id}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>{" "}
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => this.deleteAsset(asset.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    {assets.length > 0 ? (
                        <Card.Footer>
                            <div style={{ float: "left" }}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}
                                        >
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}
                                        >
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    <FormControl
                                        className={"page-num bg-secondary"}
                                        name="currentPage"
                                        value={currentPage}
                                        onChange={this.changePage}
                                    />
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}
                                        >
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}
                                        >
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                    ) : null}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        assetObject: state.asset,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAsset: (assetId) => dispatch(deleteAsset(assetId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetList);
