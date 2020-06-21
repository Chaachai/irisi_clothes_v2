import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody
} from "mdbreact";

const Register = ({ history }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage["appState"]).user);
    const [isLoggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage["appState"]).isLoggedIn
    );

    const handleRegister = e => {
        console.log("in register handling");
        e.preventDefault();
        const postData = {
            fname: fname,
            lname: lname,
            email: email,
            password: password
        };
        registerUser(postData);
    };

    function createCart(myData) {
        console.log("CREATE CART FUNCTION");
        axios
            .post("/api/carts", myData)
            .then(response => {})
            .catch(error => {
                console.log(error.response.data.errors);
            });
    }

    function registerUser(postData) {
        console.log("in the register methode");

        axios
            .post("http://localhost:8000/api/user/register", postData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert(`Registration Successful!`);
                    const {
                        fname,
                        lname,
                        id,
                        email,
                        auth_token
                    } = json.data.data;
                    let userData = {
                        fname,
                        lname,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    setUser(JSON.parse(localStorage["appState"]).user);
                    setLoggedIn(
                        JSON.parse(localStorage["appState"]).isLoggedIn
                    );
                    let cart = {
                        user_id: JSON.parse(localStorage["appState"]).user.id
                    };
                    createCart(cart);
                    history.push("/");
                } else {
                    alert(`Registration Failed!`);
                    $("#email-login-btn")
                        .removeAttr("disabled")
                        .html("Register");
                }
            })
            .catch(error => {
                alert("An Error Occured!" + error);
                // console.log(`${formData} ${error}`);
                $("#email-login-btn")
                    .removeAttr("disabled")
                    .html("Register");
            });
    }
    if (JSON.parse(localStorage["appState"]).isLoggedIn) {
        history.push("/");
        return <></>;
    } else {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="3"></MDBCol>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={handleRegister}>
                                    <p className="text-center">
                                        <img
                                            src="images/logo_square.png"
                                            width="125"
                                            height="95"
                                            className="d-inline-block"
                                            alt="React Bootstrap logo"
                                        />
                                    </p>
                                    <p className="h4 text-center py-4">
                                        Sign ups
                                    </p>
                                    <div
                                        style={{
                                            paddingLeft: 60,
                                            paddingRight: 60
                                        }}
                                        className="grey-text"
                                    >
                                        <MDBInput
                                            label="Your first name"
                                            group
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={event =>
                                                setFname(event.target.value)
                                            }
                                        />
                                        <MDBInput
                                            label="Your last name"
                                            group
                                            id="second-name"
                                            name="second-name"
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={event =>
                                                setLname(event.target.value)
                                            }
                                        />
                                        <MDBInput
                                            label="Your email"
                                            // icon="envelope"
                                            group
                                            id="email-input"
                                            name="email"
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={event =>
                                                setEmail(event.target.value)
                                            }
                                        />

                                        <MDBInput
                                            label="Your password"
                                            // icon="lock"
                                            group
                                            name="password"
                                            type="password"
                                            id="password-input"
                                            onChange={event =>
                                                setPassword(event.target.value)
                                            }
                                            validate
                                        />
                                    </div>
                                    <br />
                                    <div className="text-center">
                                        <Button
                                            style={{
                                                borderBottomRightRadius: 18,
                                                borderTopLeftRadius: 18,
                                                fontSize: 14,
                                                paddingLeft: 20,
                                                paddingRight: 20
                                            }}
                                            type="submit"
                                        >
                                            Register
                                        </Button>
                                    </div>
                                    <p className="text-center py-4">
                                        Arlready have an account?{" "}
                                        <a href="#">Login</a>
                                        <br />
                                    </p>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};

export default Register;
