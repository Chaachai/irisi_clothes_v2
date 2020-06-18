import React from "react";
import Button from "react-bootstrap/Button";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const Cart = () => {
    return (
        <div style={{ paddingTop: 66 }}>
            <MDBTable>
                <MDBTableHead color="mdb-color" textWhite>
                    <tr>
                        <th>Product</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Remove</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td style={{ width: 20 }}>
                            <Button style={{ fontSize: 12 }} variant="danger">
                                Remove
                            </Button>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default Cart;
