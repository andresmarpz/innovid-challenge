import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "98.css";
import "./theme.css";
import { StoreJSX } from "./management/Store";

ReactDOM.render(
    <React.StrictMode>
        <StoreJSX>
            <App />
        </StoreJSX>
    </React.StrictMode>,
    document.getElementById("root")
);
