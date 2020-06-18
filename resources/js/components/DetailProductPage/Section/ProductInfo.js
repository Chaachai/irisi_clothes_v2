import React, { useEffect, useState, Component } from "react";
import { Button, Radio, Descriptions } from "antd/lib";
import "../index.css";

const radioStyle = {
    display: "blockinline-block",
    marginLeft: "3px",
    borderRadius: "3px"
};
export default class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount() {
        // axios.get("/api/products/" + this.props.data.unit).then(response => {
        axios
            .get("/api/products/" + this.props.data.unit)
            .then(response => {
                this.setState({ post: response.data });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Descriptions title="Product Details">
                    <Descriptions.Item style={{ fontWeight: "bold" }}>
                        {this.state.post.name}
                    </Descriptions.Item>

                    <Descriptions.Item label="Price">
                        {" "}
                        {this.state.post.unit_price} MAD
                    </Descriptions.Item>
                    <Descriptions.Item label="Size">
                        {" "}
                        <Radio.Group defaultValue="taxable" buttonStyle="solid">
                            <Radio.Button value="S" style={radioStyle}>
                                S
                            </Radio.Button>
                            <Radio.Button value="M" style={radioStyle}>
                                M
                            </Radio.Button>
                            <Radio.Button value="L" style={radioStyle}>
                                L
                            </Radio.Button>
                        </Radio.Group>
                    </Descriptions.Item>

                    <Descriptions.Item label="Description">
                        {this.state.post.description}
                    </Descriptions.Item>
                </Descriptions>

                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button size="large" shape="round" type="danger">
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
        );
    }
}
