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

function Tops(props) {
    const [productsG1, setProductsG1] = useState([]);
    const [gCategory, setGCategory] = useState({});

    useEffect(() => {
        const gCatId = props.match.params.gcatid;
        axios
            .get(`/api/prodcat/${gCatId}`)
            .then(result => {
                console.log(result);
                setProductsG1(result.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get(`/api/g_categories/${gCatId}`)
            .then(result => {
                console.log(result);
                setGCategory(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
                Our Best {gCategory.name}
            </h2>
            <p className="grey-text text-center w-responsive mx-auto mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                error amet numquam iure provident voluptate esse quasi,
                veritatis totam voluptas nostrum quisquam eum porro a pariatur
                veniam.
            </p>

            <MDBRow>
                {productsG1.map(product => (
                    <MDBCol
                        key={product.id}
                        lg="3"
                        md="6"
                        className="mb-lg-0 mb-4"
                    >
                        <div style={{ paddingBottom: 30 }}>
                            <MDBCard className="align-items-center">
                                <MDBCardImage
                                    src={"/images/products/" + product.image}
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
}

export default Tops;
