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
import Cart from "./Cart";
import DetailProductPage from "./DetailProductPage/DetailProductPage";

class App extends Component {
    constructor(props) {
        super(props);
    }

    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    };

    render() {
        return (
            <HashRouter>
                <div>
                    <div>
                        <Header
                            logoutUser={this._logoutUser}
                            user={JSON.parse(localStorage["appState"]).user}
                            isLoggedIn={
                                JSON.parse(localStorage["appState"]).isLoggedIn
                            }
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
                                        render={props => <Login {...props} />}
                                    />
                                    <Route
                                        path="/register"
                                        render={props => (
                                            <Register {...props} />
                                        )}
                                    />
                                    <Route
                                        exact
                                        path="/cart"
                                        component={Cart}
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
