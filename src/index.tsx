import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";

import {
  RecoilRoot
} from "recoil";

import * as serviceWorker from "./serviceWorker";
import { ConfigProvider } from "antd";


ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: '#D0FFDB',
          colorText: "#000000",
          colorTextLightSolid: "#8e7456"
        },
      }}
    >
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
