import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import SearchInput from "./SearchInput";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const myStyle = {
    position: "fixed",
    width: "100%",
    zIndex: "1000"
};
const logout = props => {
    // const logout(props) {
    console.log("HELOOOOOOOOOOOOOOOOOOOO" + props.isLoggedIn);
    props._logoutUser;
};

const HeaderNotConnected = props => (
    <>
        <Navbar bg="light" variant="light" style={myStyle}>
            <Navbar.Brand>
                <Link to="/">
                    <img
                        src="images/logo.png"
                        width="120"
                        height="40"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/"
                    >
                        Home
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/cart"
                    >
                        Cart
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/wish_list"
                    >
                        Wish List
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/contact"
                    >
                        Contact
                    </Link>
                </Nav.Link>
            </Nav>
            <SearchInput />

            <Nav></Nav>

            <Nav>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/login"
                    >
                        Login
                    </Link>
                </Nav.Link>
                <Nav.Link eventKey={2}>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/register"
                    >
                        Register
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    </>
);

function HeaderConnected(props) {
    // function logout() {
    //     // const logout(props) {
    //     console.log("HELOOOOOOOOOOOOOOOOOOOO" + props);
    //     props.logoutUser();
    // }
    return (
        <Navbar bg="light" variant="light" style={myStyle}>
            <Navbar.Brand>
                <Link to="/">
                    <img
                        src="images/logo.png"
                        width="120"
                        height="40"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/"
                    >
                        Home
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/Cart"
                    >
                        Cart
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/wish_list"
                    >
                        Wish List
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/contact"
                    >
                        Contact
                    </Link>
                </Nav.Link>
            </Nav>
            <SearchInput />

            <Nav>
                <Nav.Link>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/login"
                    >
                        {props.user.fname} {props.user.lname}
                    </Link>
                </Nav.Link>
                <Nav.Link onClick={props.logoutUser} eventKey={2}>
                    <Link
                        style={{ textDecoration: "none", color: "Gray" }}
                        to="/Login"
                    >
                        Logout
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

function Header(props) {
    if (!props.isLoggedIn) return HeaderNotConnected(props);
    else return HeaderConnected(props);
}

export default Header;
