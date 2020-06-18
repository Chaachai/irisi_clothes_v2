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

const Register = ({ history, registerUser = f => f }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                                <p className="h4 text-center py-4">Sign ups</p>
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
        // <div id="main">
        //     <form
        //         id="login-form"
        //         action=""
        //         onSubmit={handleRegister}
        //         method="post"
        //     >
        //         <h3 style={{ padding: 15 }}>Register Form</h3>
        //         <input
        //             ref={input => (_fname = input)}
        //             //   style={styles.input}
        //             autoComplete="off"
        //             id="email-input"
        //             name="fname"
        //             type="text"
        //             className="center-block"
        //             placeholder="Name"
        //         />
        //         <input
        //             ref={input => (_lname = input)}
        //             //   style={styles.input}
        //             autoComplete="off"
        //             id="email-input"
        //             name="lname"
        //             type="text"
        //             className="center-block"
        //             placeholder="Name"
        //         />
        //         <input
        //             ref={input => (_email = input)}
        //             //   style={styles.input}
        //             autoComplete="off"
        //             id="email-input"
        //             name="email"
        //             type="text"
        //             className="center-block"
        //             placeholder="email"
        //         />
        //         <input
        //             ref={input => (_password = input)}
        //             //   style={styles.input}
        //             autoComplete="off"
        //             id="password-input"
        //             name="password"
        //             type="password"
        //             className="center-block"
        //             placeholder="password"
        //         />
        //         <button
        //             type="submit"
        //             //   style={styles.button}
        //             className="landing-page-btn center-block text-center"
        //             id="email-login-btn"
        //             href="#facebook"
        //         >
        //             Register
        //         </button>

        //         <Link to="/login">Login</Link>
        //     </form>
        // </div>
    );
};

export default Register;
