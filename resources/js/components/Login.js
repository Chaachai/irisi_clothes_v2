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

const Login = ({ login, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage["appState"]).user);
    const [isLoggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage["appState"]).isLoggedIn
    );

    // this.state = {
    //     isLoggedIn: JSON.parse(localStorage["appState"]).isLoggedIn,
    //     user: JSON.parse(localStorage["appState"]).user
    // };

    const handleLogin = e => {
        e.preventDefault();
        const postData = { email: email, password: password };
        console.log("HHHHHHHHHHHHHHHHHHH " + postData);
        loginUser(postData);
        //let res = loginUser(postData);
        // console.log("RES =========", res);
        // if (res == 1) {
        //     history.push("/");
        // } else {
        //     console.log("Hani ghiii hna !");
        // }
    };

    function loginUser(postData) {
        console.log("in the Login methode");

        axios
            .post("http://localhost:8000/api/user/login/", postData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert("Login Successful!");
                    // this.props.history.push("/");
                    const {
                        fname,
                        lname,
                        id,
                        email,
                        auth_token
                    } = json.data.data;
                    console.log("Bonjour ", fname, lname);

                    let userData = {
                        fname: fname,
                        lname: lname,
                        id: id,
                        email: email,
                        auth_token: auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    console.log("SAVED !!!!!!!!!!!!!!!!!!!!!");
                    setUser(JSON.parse(localStorage["appState"]).user);
                    setLoggedIn(
                        JSON.parse(localStorage["appState"]).isLoggedIn
                    );
                    history.push("/");
                    // this.setState({
                    //     isLoggedIn: JSON.parse(localStorage["appState"])
                    //         .isLoggedIn,
                    //     user: JSON.parse(localStorage["appState"]).user
                    // });
                    // return 1;
                } else {
                    alert("Login Failed!");
                    // return 0;
                }
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
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
                                        <div className="text-center custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="defaultChecked2"
                                            />
                                            <label
                                                className="custom-control-label"
                                                // for="defaultChecked2"
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
    }
};

export default Login;
