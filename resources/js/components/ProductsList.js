import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";

const ProductsList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(result => {
        console.log(result);
        setProducts(result.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <section className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our bestsellers
      </h2>
      <p className="grey-text text-center w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <h3 className="h3-responsive font-weight-bold text-left my-5">
        Our Best Tops </h3>
      <MDBRow>

        {products.map(product => product.category_id == 1 && (

          <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
            <MDBCard className="align-items-center">
              <MDBCardImage
                src={"images/products/" + product.image}
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
                    <a href="#!" className="dark-grey-text">
                      {product.name}{" "}
                      <MDBBadge pill color="danger">
                        NEW
                    </MDBBadge>
                    </a>
                  </strong>
                </h5>
                <h4 className="font-weight-bold blue-text">
                  <strong>{product.unit_price} MAD</strong>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        ))}
      </MDBRow>
      <br /><br />
      <MDBBtn gradient="blue">Show More</MDBBtn>
      <br /><br />
      <hr />
      <h3 className="h3-responsive font-weight-bold text-left my-5">
        Our Best Buttoms
      </h3>

      <MDBRow>

        {products.map(product => product.category_id == 16 && (

          <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
            <MDBCard className="align-items-center">
              <MDBCardImage
                src={"images/products/" + product.image}
                top
                alt="sample photo"
                overlay="white-slight"
              />
              <MDBCardBody className="text-center">
                <a href="#!" className="grey-text">
                  <h5>Bloose</h5>
                </a>
                <h5>
                  <strong>
                    <a href="#!" className="dark-grey-text">
                      {product.name}{" "}
                      <MDBBadge pill color="primary">
                        BEST
                    </MDBBadge>
                    </a>
                  </strong>
                </h5>
                <h4 className="font-weight-bold blue-text">
                  <strong>{product.unit_price} MAD</strong>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        ))}
      </MDBRow>
      <br /><br />
      <MDBBtn gradient="blue">Show More</MDBBtn>
      <br /><br />
      <hr />
      <h3 className="h3-responsive font-weight-bold text-left my-5">
        Our Best Accessories
      </h3>

      <MDBRow>

        {products.map(product => product.category_id == 13 && (

          <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
            <MDBCard className="align-items-center">
              <MDBCardImage
                src={"images/products/" + product.image}
                top
                alt="sample photo"
                overlay="white-slight"
              />
              <MDBCardBody className="text-center">
                <a href="#!" className="grey-text">
                  <h5>Belt</h5>
                </a>
                <h5>
                  <strong>
                    <a href="#!" className="dark-grey-text">
                    {product.name}{" "}
                      <MDBBadge pill color="danger">
                        NEW
                    </MDBBadge>
                    </a>
                  </strong>
                </h5>
                <h4 className="font-weight-bold blue-text">
                  <strong>{product.unit_price} MAD</strong>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        ))}
      </MDBRow>
      <br /><br />
      <MDBBtn gradient="blue">Show More</MDBBtn>

    </section>
  );
}

export default ProductsList;