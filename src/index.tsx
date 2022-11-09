import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

import "./index.css";

import App from "./App";

ReactDOM.render(
  <MoralisProvider appId="E7yry3NsSa93Ox0Qs52lfmDLSitC571pV9mQNeo4" serverUrl="https://sevyswvkdysp.usemoralis.com:2053/server">
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);
