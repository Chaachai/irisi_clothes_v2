import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImage from "./Section/ProductImage";
import ProductInfo from "./Section/ProductInfo";
import "./index.css";

export default class DetailProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { unit: this.props.id };
    }
    changeUnit(item) {
        this.setState({ unit: item });
    }
    render() {
        return (
            <div
                className="postPage"
                style={{ width: "100%", padding: "3rem 4rem" }}
            >
                <br />

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24}>
                        <ProductImage
                            data={{
                                unit: this.state.unit,
                                changeUnit: this.changeUnit.bind(this)
                            }}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <ProductInfo
                            data={{
                                unit: this.state.unit,
                                changeUnit: this.changeUnit.bind(this)
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
