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

// const history = useHistory();

const Login = ({ history, loginUser = f => f }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = e => {
        e.preventDefault();
        const postData = { email: email, password: password };
        console.log("HHHHHHHHHHHHHHHHHHH " + postData);
        loginUser(postData);
    };
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={handleLogin}>
                                <p className="text-center">
                                    <img
                                        src="images/logo_square.png"
                                        width="125"
                                        height="95"
                                        className="d-inline-block"
                                        alt="React Bootstrap logo"
                                    />
                                </p>
                                <p className="h4 text-center py-4">Login</p>
                                <div
                                    style={{
                                        paddingLeft: 60,
                                        paddingRight: 60
                                    }}
                                    className="grey-text"
                                >
                                    <MDBInput
                                        label="Your email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        name="email"
                                        value={email}
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                    <MDBInput
                                        label="Your password"
                                        icon="lock"
                                        group
                                        name="password"
                                        type="password"
                                        validate
                                        value={password}
                                        onChange={event =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                    <div class="text-center custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="defaultChecked2"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="defaultChecked2"
                                        >
                                            Remember me
                                        </label>
                                    </div>
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
                                        Login
                                    </Button>
                                </div>
                                <p className="text-center py-4">
                                    You don't have an account?{" "}
                                    <a href="#">Join now</a>
                                    <br />
                                    <a href="#">Forgot your password?</a>
                                </p>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
