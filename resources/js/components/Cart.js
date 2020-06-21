import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./../../css/index.css";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBCard,
    MDBCardImage
} from "mdbreact";

const Cart = ({ history }) => {
    const [cart, setCart] = useState({});
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    // const [value, setValue] = useState(0);

    function calculateTotal(cart_id) {
        axios
            .get("/api/calculate_amount/" + cart_id)
            .then(response => {
                // console.log("SUM ==", response.data);
                setTotal(response.data);
            })
            .catch(error => {
                console.log(error.response.data.errors);
            });
    }

    function decrease(cartItemId, val) {
        if (val > 1) {
            const postData = {
                quantity: val - 1
            };
            axios
                .put("/api/cart_items/" + cartItemId, postData)
                .then(response => {
                    console.log("was UPDATED !!!!", response);
                })
                .catch(error => {
                    console.log(error.response.data.errors);
                });
            getCartItems();
        }
    }

    function increase(cartItemId, val) {
        const postData = {
            quantity: val + 1
        };
        axios
            .put("/api/cart_items/" + cartItemId, postData)
            .then(response => {
                console.log("was UPDATED !!!!", response);
            })
            .catch(error => {
                console.log(error.response.data.errors);
            });
        getCartItems();
    }

    function handleRemove(cartItemId) {
        console.log("cart item id", cartItemId);
        axios
            .delete("/api/cart_items/" + cartItemId)
            .then(response => {
                console.log("was deleted", response);
            })
            .catch(error => {
                console.log(error.response.data.errors);
            });
        getCartItems();
    }

    useEffect(() => {
        getCartItems();
    }, []);

    async function getCartItems() {
        try {
            const response = await fetch(
                `/api/getCartByUser/${
                    JSON.parse(localStorage["appState"]).user.id
                }`
            );
            const result = await response.json();
            setCart(result);
            getItems(result.id);
            calculateTotal(result.id);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function getItems(cart_id) {
        try {
            const response = await fetch(`/api/get_items_by_photo/${cart_id}`);
            const result = await response.json();
            console.log("BBBBBBBBBBB ", result);
            setItems(result);
        } catch (error) {
            console.log("error", error);
        }
    }

    if (!JSON.parse(localStorage["appState"]).isLoggedIn) {
        history.push("/login");
        return <></>;
    } else {
        console.log("in use render");
        return (
            <section className="text-center my-5">
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Shopping cart ({items.length})
                </h2>
                <div>
                    <MDBTable>
                        <MDBTableHead>
                            <tr style={{ backgroundColor: "#cfcfcf" }}>
                                <th
                                    style={{
                                        borderRight: "hidden",
                                        borderLeft: "hidden"
                                    }}
                                >
                                    Product
                                </th>
                                <th
                                    style={{
                                        borderLeft: "hidden"
                                    }}
                                ></th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Remove</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {items.map(item => (
                                <tr
                                    style={{
                                        backgroundColor: "white",
                                        verticalAlign: "middle"
                                    }}
                                >
                                    <td
                                        style={{
                                            borderRight: "hidden",
                                            width: 200,
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <MDBCard className="align-items-center">
                                            <MDBCardImage
                                                src={"/storage/" + item.mImage}
                                                top
                                                alt="sample photo"
                                                overlay="white-slight"
                                            />
                                        </MDBCard>
                                    </td>
                                    <td
                                        style={{
                                            width: 230,
                                            borderLeft: "hidden",
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <h6 style={{ fontWeight: "bold" }}>
                                            {item.mProduct}
                                        </h6>
                                        <br />
                                        {item.mDescription}
                                    </td>
                                    <td
                                        style={{
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        {item.mColor}
                                    </td>
                                    <td
                                        style={{
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        {item.mSize}
                                    </td>
                                    <td
                                        style={{
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        {item.mPrice} MAD
                                    </td>
                                    <td
                                        style={{
                                            width: 20,
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <div className="def-number-input number-input">
                                            <button
                                                onClick={() =>
                                                    decrease(
                                                        item.mId,
                                                        item.mQuantity
                                                    )
                                                }
                                                className="minus"
                                            ></button>
                                            <input
                                                className="quantity"
                                                name="quantity"
                                                value={item.mQuantity}
                                                onChange={() =>
                                                    console.log("change")
                                                }
                                                type="number"
                                            />
                                            <button
                                                onClick={() =>
                                                    increase(
                                                        item.mId,
                                                        item.mQuantity
                                                    )
                                                }
                                                className="plus"
                                            ></button>
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        {item.mQuantity * item.mPrice} MAD
                                    </td>

                                    <td
                                        style={{
                                            width: 20,
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                handleRemove(item.mId)
                                            }
                                            style={{
                                                fontSize: 12,
                                                borderRadius: 15
                                            }}
                                            variant="danger"
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ backgroundColor: "#cfcfcf" }}>
                                <td nowrap colspan="8">
                                    <h5
                                        style={{
                                            display: "inline"
                                        }}
                                    >
                                        Total amount :
                                    </h5>{" "}
                                    <h5
                                        style={{
                                            fontWeight: "bold",
                                            display: "inline"
                                        }}
                                    >
                                        {total} MAD
                                    </h5>{" "}
                                    <Button
                                        style={{
                                            fontSize: 12,
                                            borderRadius: 15
                                        }}
                                        variant="primary"
                                    >
                                        Pay now
                                    </Button>
                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </div>
            </section>
        );
    }
};

export default Cart;
