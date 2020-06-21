import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBBadge
} from "mdbreact";

function searchResult(props) {
    // const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);

    const displayProducts = () => {
        if (products.length > 0) {
            console.log("we have more than one produts");
            return (
                <section className="text-center my-5">
                    {/* {console.log("in render searchInput")} */}
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Results For{" "}
                        <span
                            style={{
                                color: "red"
                            }}
                        >
                            {props.match.params.keyword}
                        </span>
                    </h2>
                    <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Fugit, error amet numquam iure provident voluptate
                        esse quasi, veritatis totam voluptas nostrum quisquam
                        eum porro a pariatur veniam.
                    </p>

                    <MDBRow>
                        {products.map(product => (
                            <MDBCol
                                key={product.id}
                                lg="3"
                                md="6"
                                className="mb-lg-0 mb-4"
                            >
                                <div style={{ paddingBottom: 30 }}>
                                    <MDBCard className="align-items-center">
                                        <MDBCardImage
                                            src={"storage/" + product.image}
                                            top
                                            alt="sample photo"
                                            overlay="white-slight"
                                        />
                                        <MDBCardBody className="text-center">
                                            <a href="#!" className="grey-text">
                                                <h5>Tops</h5>
                                            </a>
                                            <h5>
                                                <strong>
                                                    <a
                                                        href="#!"
                                                        className="dark-grey-text"
                                                    >
                                                        {product.name}
                                                    </a>
                                                </strong>
                                            </h5>
                                            <h4 className="font-weight-bold blue-text">
                                                <strong>
                                                    {product.unit_price} MAD
                                                </strong>
                                            </h4>
                                        </MDBCardBody>
                                    </MDBCard>
                                </div>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </section>
            );
        } else {
            return (
                <section className="text-center my-5">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        We dont have products for{" "}
                        <span
                            style={{
                                color: "red"
                            }}
                        >
                            {props.match.params.keyword}
                        </span>
                    </h2>
                </section>
            );
        }
    };
    useEffect(() => {
        console.log("in use effect searchResult", props.match.params.keyword);
        // setKeyword(props.match.params.keyword);
        axios
            .get(`/api/productByKeyword/${props.match.params.keyword}`)
            .then(result => {
                console.log(result);
                setProducts(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props]);
    return (
        <React.Fragment>{displayProducts()}</React.Fragment>

        // <div>Our Best {keyword}</div>
    );
}

export default searchResult;
