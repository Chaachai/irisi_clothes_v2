import React from "react";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter, withRouter } from "react-router-dom";

const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,

    document.getElementById("app")
);
