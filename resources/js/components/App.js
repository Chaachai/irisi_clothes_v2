import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Route,
    Switch,
    HashRouter,
    Redirect,
    useHistory
} from "react-router-dom";
import Header from "./Header";
import Slider from "./Slider";
import SideMenu from "./SideMenu";
import ShowMoreProducts from "./ShowMoreProducts";
import SearchResult from "./SearchResult";
import ProductsList from "./ProductsList";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import Login from "./Login";
import Register from "./Register";
import DetailProductPage from "./DetailProductPage/DetailProductPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: JSON.parse(localStorage["appState"]).isLoggedIn,
            user: JSON.parse(localStorage["appState"]).user
        };
    }

    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    };
    _registerUser = postData => {
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
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                    // redirect home
                    //this.props.history.push("/");
                } else {
                    alert(`Registration Failed!`);
                    $("#email-login-btn")
                        .removeAttr("disabled")
                        .html("Register");
                }
            })
            .catch(error => {
                alert("An Error Occured!" + error);
                console.log(`${formData} ${error}`);
                $("#email-login-btn")
                    .removeAttr("disabled")
                    .html("Register");
            });
    };

    _loginUser = postData => {
        console.log("in the Login methode");

        axios
            .post("http://localhost:8000/api/user/login/", postData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    //alert("Login Successful!");
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

                    this.setState({
                        isLoggedIn: JSON.parse(localStorage["appState"])
                            .isLoggedIn,
                        user: JSON.parse(localStorage["appState"]).user
                    });
                } else alert("Login Failed!");

                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    };
    render() {
        // console.log(this.state.isLoggedIn);
        // console.log("path name: " + this.props.location.pathname);
        // if (
        //     !this.state.isLoggedIn &&
        //     this.props.location.pathname !== "/login" &&
        //     this.props.location.pathname !== "/register"
        // ) {
        //     console.log(
        //         "you are not loggedin and are not visiting login or register, so go to login page"
        //     );
        //     this.props.history.push("/login");
        // }
        // if (
        //     // this.state.isLoggedIn &&
        //     this.props.location.pathname === "/login" ||
        //     this.props.location.pathname === "/register"
        // ) {
        //     console.log(
        //         "you are either going to login or register but youre logged in"
        //     );

        //     this.props.history.push("/");
        // }
        return (
            <HashRouter>
                <div>
                    <div>
                        <Header
                            logoutUser={this._logoutUser}
                            user={this.state.user}
                            isLoggedIn={this.state.isLoggedIn}
                        />
                    </div>
                    <div style={{ paddingTop: 66 }}>
                        <Row>
                            <Col style={{ paddingLeft: 57, width: 300 }} sm={2}>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={SideMenu}
                                    />
                                </Switch>
                            </Col>
                            <Col sm={10}>
                                <Switch>
                                    <Route exact path="/" component={Slider} />
                                </Switch>
                            </Col>
                        </Row>
                    </div>

                    <Container>
                        <Row>
                            <Col sm={12}>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={ProductsList}
                                    />
                                    <Route
                                        path="/show/:gcatid"
                                        component={ShowMoreProducts}
                                    />
                                    <Route
                                        path="/showSearchResult/:keyword"
                                        component={SearchResult}
                                    />

                                    <Route
                                        path="/login"
                                        render={props => (
                                            <Login
                                                {...props}
                                                loginUser={this._loginUser}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/register"
                                        render={props => (
                                            <Register
                                                {...props}
                                                registerUser={
                                                    this._registerUser
                                                }
                                            />
                                        )}
                                    />
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                    <Route
                        exact
                        path="/product/:id"
                        render={props => {
                            return (
                                <DetailProductPage id={props.match.params.id} />
                            );
                        }}
                    />

                    <div>
                        <Footer />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
