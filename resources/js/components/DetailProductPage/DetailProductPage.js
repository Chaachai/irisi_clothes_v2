import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { Row, Col } from "antd";
import ImageGallery from "react-image-gallery";
import { Button, Radio, Descriptions } from "antd/lib";
import "./index.css";
import { withRouter } from "react-router";

const radioStyle = {
    display: "blockinline-block",
    marginLeft: "3px",
    borderRadius: "3px"
};

class DetailProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: this.props.id,
            mPhotos: [],
            mProduct: [],
            currentIndex: 0,
            mCart: {},
            mSize: ""
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.getImage();
        this.getProduct();
        this.getUserCart();
    }

    handleRadioSelect = event => {
        this.setState({
            mSize: event.target.value
        });
    };

    getImage() {
        axios
            .get("/api/images/" + this.state.unit)
            .then(response => {
                console.log("======================== ", response);
                this.setState({ mPhotos: response.data });
            })
            .catch(error => console.log(error));
    }

    getProduct() {
        axios
            .get("/api/products/" + this.state.unit)
            .then(response => {
                this.setState({ mProduct: response.data });
            })
            .catch(error => console.log(error));
    }

    changeUnit(item) {
        this.setState({ unit: item });
    }

    onClick(event, index) {
        this.setState({
            currentIndex: index
        });
        console.log(" FEENN HAJIA", this.state.mPhotos[index]);
        // console.log(" HEEEEEEEEEEY", event);
    }

    addToCart() {
        if (!JSON.parse(localStorage["appState"]).isLoggedIn) {
            const { history } = this.props;
            history.push("/login");
            // console.log("props props ", props);
        } else if (this.state.mSize === "") {
            alert("You need to choose the product size !");
        } else {
            const postData = {
                color: this.state.mPhotos[this.state.currentIndex].color,
                size: this.state.mSize,
                cart_id: this.state.mCart.id,
                product_id: this.state.mProduct.id
            };

            axios
                .post("/api/cart_items", postData)
                .then(response => {})
                .catch(error => {
                    console.log(error.response.data.errors);
                });
            alert("The product has been added to the cart !");
            // console.log("POST FIHA :::: ", postData);
        }

        // console.log(
        //     "Color ==== ",
        //     this.state.mPhotos[this.state.currentIndex].color
        // );
        // console.log("Product_id ==== ", this.state.mProduct.id);
    }

    getUserCart() {
        let user_id = JSON.parse(localStorage["appState"]).user.id;
        // console.log("User_id ==== ", user_id);

        axios
            .get(
                `/api/getCartByUser/${
                    JSON.parse(localStorage["appState"]).user.id
                }`
            )
            .then(response => {
                this.setState({ mCart: response.data });
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    render() {
        let images = [];
        this.state.mPhotos.map(photo => {
            images.push({
                original: "/storage/" + photo.image,
                thumbnail: "/storage/" + photo.image
            });
        });
        return (
            <div
                className="postPage"
                style={{ width: "100%", padding: "3rem 4rem" }}
            >
                <br />

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24}>
                        <div>
                            <ImageGallery
                                items={images}
                                onThumbnailClick={(event, index) =>
                                    this.onClick(event, index)
                                }
                            />
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div>
                            <Descriptions title="Product Details">
                                <Descriptions.Item
                                    style={{ fontWeight: "bold" }}
                                >
                                    {this.state.mProduct.name}
                                </Descriptions.Item>

                                <Descriptions.Item label="Price">
                                    {" "}
                                    {this.state.mProduct.unit_price} MAD
                                </Descriptions.Item>
                                <Descriptions.Item label="Size">
                                    {" "}
                                    <Radio.Group
                                        defaultValue="taxable"
                                        buttonStyle="solid"
                                        onChange={e =>
                                            this.handleRadioSelect(e)
                                        }
                                    >
                                        <Radio.Button
                                            value="S"
                                            style={radioStyle}
                                        >
                                            S
                                        </Radio.Button>
                                        <Radio.Button
                                            value="M"
                                            style={radioStyle}
                                        >
                                            M
                                        </Radio.Button>
                                        <Radio.Button
                                            value="L"
                                            style={radioStyle}
                                        >
                                            L
                                        </Radio.Button>
                                    </Radio.Group>
                                </Descriptions.Item>

                                <Descriptions.Item label="Description">
                                    {this.state.mProduct.description}
                                </Descriptions.Item>
                            </Descriptions>

                            <br />
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    onClick={() => this.addToCart()}
                                    size="large"
                                    shape="round"
                                    type="danger"
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    size="large"
                                    shape="round"
                                    type="ghost"
                                    style={{ marginLeft: "5px" }}
                                >
                                    Add to wish list
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(DetailProductPage);
